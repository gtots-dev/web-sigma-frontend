'use client'

import { memo } from 'react'
import { MonitoringHexCell as MonitoringHexCellType } from '../../../domain/interfaces/monitoring-cell.interface'
import { useMonitoringCellStyles } from '../../hooks/use-monitoring-cell-styles.hook'

const COMPACT_RADIUS_THRESHOLD = 28

function MonitoringHexagonCellComponent({
  hex,
  isActive,
  points,
  radius,
  onSelect
}: {
  hex: MonitoringHexCellType
  isActive: boolean
  points: (cx: number, cy: number, r: number) => string
  radius: number
  onSelect: (id: string) => void
}) {
  const fontSize = Math.max(8, radius * 0.32)
  const maxTextWidth = radius * 1.0
  const isCompact = radius < COMPACT_RADIUS_THRESHOLD

  const {
    healthColorRgb,
    connectionColorRgb,
    fillColor,
    strokeColor,
    strokeWidth,
    displayName,
    errorCount,
    badgeFill
  } = useMonitoringCellStyles({
    cell: hex.cell,
    isActive,
    widthOrRadius: maxTextWidth,
    fontSize
  })

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
      filter={isActive ? 'url(#glow)' : 'url(#inner-glow)'}
      style={{ color: healthColorRgb }}
      className="cursor-pointer hover:stroke-blue-400 transition-colors duration-200"
    />
  )

  if (isCompact) {
    const dot1cx = hex.cx - radius * 0.22
    const dot2cx = hex.cx + radius * 0.22
    const dotY = hex.cy - radius * 0.25
    const dotR = radius * 0.12

    return (
      <g
        className={isActive ? 'z-10' : 'z-0'}
        style={{ transformOrigin: `${hex.cx}px ${hex.cy}px` }}
      >
        {polygon}
        <circle
          cx={dot1cx}
          cy={dotY}
          r={dotR}
          fill={healthColorRgb}
          className="pointer-events-none"
        />
        <circle
          cx={dot2cx}
          cy={dotY}
          r={dotR}
          fill={connectionColorRgb}
          className="pointer-events-none"
        />
        <text
          x={hex.cx}
          y={hex.cy + radius * 0.38}
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
      </g>
    )
  }

  const dotY = hex.cy - radius * 0.25
  const dotR = radius * 0.14
  const connDotY = hex.cy + radius * 0.55
  const connDotR = radius * 0.08

  const badgeSize = radius * 0.35
  const badgeX = hex.cx + radius * 0.38
  const badgeY = hex.cy - radius * 0.45

  return (
    <g
      className={isActive ? 'z-10' : 'z-0'}
      style={{ transformOrigin: `${hex.cx}px ${hex.cy}px` }}
    >
      {polygon}
      <circle
        cx={hex.cx}
        cy={dotY}
        r={dotR}
        fill={healthColorRgb}
        className="pointer-events-none"
      />

      <text
        x={hex.cx}
        y={hex.cy + radius * 0.38}
        textAnchor="middle"
        fontSize={fontSize}
        fill={isActive ? 'var(--primary-500)' : 'hsl(var(--muted-foreground))'}
        className="select-none font-medium"
        pointerEvents="none"
      >
        {displayName}
      </text>

      <circle
        cx={hex.cx}
        cy={connDotY}
        r={connDotR}
        fill={connectionColorRgb}
        className="pointer-events-none"
      />

      {errorCount > 0 && (
        <g className="pointer-events-none">
          <circle cx={badgeX} cy={badgeY} r={badgeSize / 2} fill={badgeFill} />
          <text
            x={badgeX}
            y={badgeY + badgeSize * 0.18}
            textAnchor="middle"
            fontSize={radius * 0.22}
            fill="white"
            fontWeight="bold"
          >
            {errorCount > 9 ? '9+' : errorCount}
          </text>
        </g>
      )}
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
      prev.hex.cell.errorCount === next.hex.cell.errorCount &&
      prev.hex.cell.json === next.hex.cell.json &&
      prev.isActive === next.isActive &&
      prev.radius === next.radius &&
      prev.hex.cx === next.hex.cx &&
      prev.hex.cy === next.hex.cy
    )
  }
)
