'use client'

import { memo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { MonitoringGridCell as MonitoringGridCellType } from '../../../domain/interfaces/monitoring-cell.interface'
import { useMonitoringCellStyles } from '../../hooks/use-monitoring-cell-styles.hook'
import { useMonitoringDashboardStore } from '../../stores/use-monitoring-dashboard.store'

const COMPACT_WIDTH_THRESHOLD = 75

function MonitoringGridCellComponent({
  cell,
  isActive,
  width,
  height,
  onSelect
}: {
  cell: MonitoringGridCellType
  isActive: boolean
  width: number
  height: number
  onSelect: (id: string) => void
}) {
  const fontSize = 11
  const isCompact = width < COMPACT_WIDTH_THRESHOLD

  const {
    healthColorRgb,
    fillColor,
    strokeColor,
    strokeWidth,
    displayName,
    isOffline
  } = useMonitoringCellStyles({
    cell: cell.cell,
    isActive,
    widthOrRadius: width - 12,
    fontSize
  })



  const upStatuses = useMonitoringDashboardStore(
    useShallow((state) => (cell.cell.upIds || []).map((upId) => state.upData.get(upId)))
  )
  const laneStatuses = useMonitoringDashboardStore(
    useShallow((state) => (cell.cell.laneIds || []).map((laneId) => state.laneData.get(laneId)))
  )

  const ups = (cell.cell.upIds || []).map((upId, idx) => {
    const liveData = upStatuses[idx]
    const hasData = !!liveData
    const requestData = liveData?.request
    const items = requestData?.items || []

    let maxLevel = 0
    items.forEach((group) => {
      group.elements.forEach((el) => {
        if (el.level > maxLevel) {
          maxLevel = el.level
        }
      })
    })

    return {
      id: upId,
      level: maxLevel,
      hasData,
      offline: !hasData
    }
  })

  const lanes = (cell.cell.laneIds || []).map((laneId, idx) => {
    const liveData = laneStatuses[idx]
    const hasData = !!liveData
    const requestData = liveData?.request
    const items = requestData?.items || []

    let maxLevel = 0
    items.forEach((group) => {
      group.elements?.forEach((el) => {
        if (el.level > maxLevel) {
          maxLevel = el.level
        }
      })
    })

    return {
      lane_id: Number(laneId),
      level: maxLevel,
      hasData
    }
  })

  const hasStructure = true

  const topCount = ups.length
  const bottomVal = lanes.length

  const rect = (
    <rect
      x={cell.x}
      y={cell.y}
      width={width}
      height={height}
      rx={isCompact ? 6 : 8}
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      onPointerDown={(e) => {
        e.stopPropagation()
        onSelect(cell.cell.id)
      }}
      style={{ color: healthColorRgb }}
      className="cursor-pointer hover:stroke-blue-400 transition-colors duration-200"
    />
  )

  let badgeFill = '#1f2937'
  let maxLaneLevel = -1
  lanes.forEach((l) => {
    if (l.hasData && l.level !== undefined) {
      if (l.level > maxLaneLevel) {
        maxLaneLevel = l.level
      }
    }
  })

  if (maxLaneLevel === 0) {
    badgeFill = 'rgb(var(--monitoring-ok))'
  } else if (maxLaneLevel === 1) {
    badgeFill = 'rgb(var(--monitoring-warning))'
  } else if (maxLaneLevel >= 2) {
    badgeFill = 'rgb(var(--monitoring-error))'
  } else if (lanes.length > 0) {
    badgeFill = 'rgb(var(--monitoring-offline))'
  }

  const renderTopCircles = (isComp: boolean) => {
    const r = isComp ? 3 : 4
    const gap = isComp ? 1 : 2
    const spacing = r * 2 + gap
    const totalWidth = (topCount - 1) * spacing

    const startX = cell.x + width / 2 - totalWidth / 2
    const centerY = cell.y + (isComp ? 8 : 12)

    const circles = []
    for (let i = 0; i < topCount; i++) {
      const cx = startX + i * spacing
      const cy = centerY

      let fill = 'rgb(var(--monitoring-offline))'
      if (hasStructure && ups[i]) {
        const upItem = ups[i]
        if (upItem.hasData && !upItem.offline) {
          if (upItem.level === 0) fill = 'rgb(var(--monitoring-ok))'
          else if (upItem.level === 1) fill = 'rgb(var(--monitoring-warning))'
          else fill = 'rgb(var(--monitoring-error))'
        }
      }

      circles.push(
        <circle
          key={`top-circle-${i}`}
          cx={cx}
          cy={cy}
          r={r}
          fill={fill}
          className="pointer-events-none transition-all duration-200"
        />
      )
    }
    return circles
  }

  if (isCompact) {
    const badgeSize = 12
    const padding = 2
    const badgeX = cell.x + width - badgeSize / 2 - padding
    const badgeY = cell.y + height - badgeSize / 2 - padding
    return (
      <g
        className={`${isActive ? 'z-10' : 'z-0'} ${
          isOffline
            ? isActive
              ? 'opacity-95'
              : 'opacity-80 hover:opacity-90'
            : ''
        } transition-opacity duration-200`}
      >
        {rect}
        {renderTopCircles(true)}

        <text
          x={cell.x + width / 2}
          y={cell.y + height / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={fontSize - 2}
          fill={
            isActive ? 'var(--primary-500)' : 'hsl(var(--muted-foreground))'
          }
          className="select-none font-semibold"
          pointerEvents="none"
        >
          {displayName}
        </text>

        {/* Bottom Badge (Compact) */}
        <g className="pointer-events-none">
          <circle cx={badgeX} cy={badgeY} r={badgeSize / 2} fill={badgeFill} />
          <text
            x={badgeX}
            y={badgeY}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={6}
            fill="white"
            fontWeight="bold"
          >
            {bottomVal}
          </text>
        </g>
      </g>
    )
  }

  const badgeSize = 16
  const padding = 3
  const badgeX = cell.x + width - badgeSize / 2 - padding
  const badgeY = cell.y + height - badgeSize / 2 - padding

  return (
    <g
      className={`${isActive ? 'z-10' : 'z-0'} ${
        isOffline
          ? isActive
            ? 'opacity-95'
            : 'opacity-80 hover:opacity-90'
          : ''
      } transition-opacity duration-200`}
    >
      {rect}
      {renderTopCircles(false)}

      <text
        x={cell.x + width / 2}
        y={cell.y + height / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={fontSize}
        fill={isActive ? 'var(--primary-500)' : 'hsl(var(--muted-foreground))'}
        className="select-none font-bold"
        pointerEvents="none"
      >
        {displayName}
      </text>

      {/* Bottom Badge (Normal) */}
      <g className="pointer-events-none">
        <circle cx={badgeX} cy={badgeY} r={badgeSize / 2} fill={badgeFill} />
        <text
          x={badgeX}
          y={badgeY}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={8}
          fill="white"
          fontWeight="bold"
        >
          {bottomVal}
        </text>
      </g>
    </g>
  )
}

export const MonitoringGridCell = memo(
  MonitoringGridCellComponent,
  (prev, next) => {
    return (
      prev.cell.cell.id === next.cell.cell.id &&
      prev.cell.cell.status === next.cell.cell.status &&
      prev.cell.cell.name === next.cell.cell.name &&
      prev.cell.cell.connectionStatus === next.cell.cell.connectionStatus &&
      (prev.cell.cell.upIds || []).join(',') === (next.cell.cell.upIds || []).join(',') &&
      (prev.cell.cell.laneIds || []).join(',') === (next.cell.cell.laneIds || []).join(',') &&
      prev.isActive === next.isActive &&
      prev.width === next.width &&
      prev.height === next.height &&
      prev.cell.x === next.cell.x &&
      prev.cell.y === next.cell.y
    )
  }
)
