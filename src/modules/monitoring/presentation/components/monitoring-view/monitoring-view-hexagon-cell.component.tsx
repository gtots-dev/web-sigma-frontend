'use client'

import { memo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { MonitoringHexCell as MonitoringHexCellType } from '../../../domain/interfaces/monitoring-cell.interface'
import { useMonitoringCellStyles } from '../../hooks/use-monitoring-cell-styles.hook'
import { useMonitoringDashboardStore } from '../../stores/use-monitoring-dashboard.store'

const COMPACT_RADIUS_THRESHOLD = 28

function MonitoringHexagonCellComponent({
  hex,
  isActive,
  points,
  radius,
  onSelect,
  onHover
}: {
  hex: MonitoringHexCellType
  isActive: boolean
  points: (cx: number, cy: number, r: number) => string
  radius: number
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
}) {
  const fontSize = Math.max(8, radius * 0.32)
  const maxTextWidth = radius * 1.0
  const isCompact = radius < COMPACT_RADIUS_THRESHOLD

  const {
    healthColorRgb,
    fillColor,
    strokeColor,
    strokeWidth,
    displayName,
    isOffline
  } = useMonitoringCellStyles({
    cell: hex.cell,
    isActive,
    widthOrRadius: maxTextWidth,
    fontSize
  })



  const upStatuses = useMonitoringDashboardStore(
    useShallow((state) => (hex.cell.upIds || []).map((upId) => state.upData.get(upId)))
  )
  const laneStatuses = useMonitoringDashboardStore(
    useShallow((state) => (hex.cell.laneIds || []).map((laneId) => state.laneData.get(laneId)))
  )

  const ups = (hex.cell.upIds || []).map((upId, idx) => {
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

  const lanes = (hex.cell.laneIds || []).map((laneId, idx) => {
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

  const polygon = (
    <polygon
      points={points(hex.cx, hex.cy, radius)}
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      onPointerDown={(e) => {
        e.stopPropagation()
        onSelect(hex.cell.id)
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
    // Constant size and gap regardless of quantity
    const r = isComp ? Math.max(1, radius * 0.06) : radius * 0.09
    const gap = isComp ? 1 : 2
    const spacing = r * 2 + gap
    const totalWidth = (topCount - 1) * spacing

    const startX = hex.cx - totalWidth / 2
    const centerY =
      (isComp ? hex.cy - radius * 0.35 : hex.cy - radius * 0.4) - 1

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
          className="pointer-events-none transition-colors duration-200"
        />
      )
    }
    return circles
  }

  if (isCompact) {
    const badgeSize = radius * 0.38
    const badgeY = hex.cy + radius * 0.4 + 1

    return (
      <g
        className={`${isActive ? 'z-10' : 'z-0'} ${
          isOffline
            ? isActive
              ? 'opacity-95'
              : 'opacity-80 hover:opacity-90'
            : ''
        } transition-opacity duration-200`}
        style={{ transformOrigin: `${hex.cx}px ${hex.cy}px` }}
        onPointerEnter={() => onHover(hex.cell.id)}
        onPointerLeave={() => onHover(null)}
      >
        {polygon}
        {renderTopCircles(true)}
        <text
          x={hex.cx}
          y={hex.cy + fontSize * 0.35}
          textAnchor="middle"
          fontSize={fontSize}
          fill={
            isActive ? 'var(--primary-500)' : 'hsl(var(--muted-foreground))'
          }
          className="select-none font-medium"
          pointerEvents="none"
        >
          {displayName}
        </text>

        {/* Bottom Badge (Compact) */}
        <g className="pointer-events-none">
          <circle cx={hex.cx} cy={badgeY} r={badgeSize / 2} fill={badgeFill} />
          <text
            x={hex.cx}
            y={badgeY + badgeSize * 0.15}
            textAnchor="middle"
            fontSize={Math.max(6, radius * 0.22)}
            fill="white"
            fontWeight="bold"
          >
            {bottomVal}
          </text>
        </g>
      </g>
    )
  }

  const badgeSize = radius * 0.45
  const badgeY = hex.cy + radius * 0.45 + 1

  return (
    <g
      className={`${isActive ? 'z-10' : 'z-0'} ${
        isOffline
          ? isActive
            ? 'opacity-95'
            : 'opacity-80 hover:opacity-90'
          : ''
      } transition-opacity duration-200`}
      style={{ transformOrigin: `${hex.cx}px ${hex.cy}px` }}
      onPointerEnter={() => onHover(hex.cell.id)}
      onPointerLeave={() => onHover(null)}
    >
      {polygon}
      {renderTopCircles(false)}

      <text
        x={hex.cx}
        y={hex.cy + fontSize * 0.35}
        textAnchor="middle"
        fontSize={fontSize}
        fill={isActive ? 'var(--primary-500)' : 'hsl(var(--muted-foreground))'}
        className="select-none font-medium"
        pointerEvents="none"
      >
        {displayName}
      </text>

      {/* Bottom Badge (Normal) */}
      <g className="pointer-events-none">
        <circle cx={hex.cx} cy={badgeY} r={badgeSize / 2} fill={badgeFill} />
        <text
          x={hex.cx}
          y={badgeY + badgeSize * 0.15}
          textAnchor="middle"
          fontSize={Math.max(8, radius * 0.25)}
          fill="white"
          fontWeight="bold"
        >
          {bottomVal}
        </text>
      </g>
    </g>
  )
}

export const MonitoringHexagonCell = memo(
  MonitoringHexagonCellComponent,
  (prev, next) => {
    return (
      prev.hex.cell.id === next.hex.cell.id &&
      prev.hex.cell.status === next.hex.cell.status &&
      prev.hex.cell.name === next.hex.cell.name &&
      prev.hex.cell.connectionStatus === next.hex.cell.connectionStatus &&
      (prev.hex.cell.upIds || []).join(',') === (next.hex.cell.upIds || []).join(',') &&
      (prev.hex.cell.laneIds || []).join(',') === (next.hex.cell.laneIds || []).join(',') &&
      prev.isActive === next.isActive &&
      prev.radius === next.radius &&
      prev.hex.cx === next.hex.cx &&
      prev.hex.cy === next.hex.cy
    )
  }
)
