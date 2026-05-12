'use client'

import { memo } from 'react'
import { MonitoringGridCell as MonitoringGridCellType } from '../../../domain/interfaces/monitoring-cell.interface'
import { useMonitoringCellStyles } from '../../hooks/use-monitoring-cell-styles.hook'

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
    connectionColorRgb,
    fillColor,
    strokeColor,
    strokeWidth,
    displayName,
    errorCount,
    badgeFill
  } = useMonitoringCellStyles({
    cell: cell.cell,
    isActive,
    widthOrRadius: width - 12,
    fontSize
  })

  if (isCompact) {
    return (
      <g className={isActive ? 'z-10' : 'z-0'}>
        <rect
          x={cell.x}
          y={cell.y}
          width={width}
          height={height}
          rx={6}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          onPointerDown={(e) => {
            e.stopPropagation()
            onSelect(cell.cell.id)
          }}
          filter={isActive ? 'url(#glow)' : 'url(#inner-glow)'}
          style={{ color: healthColorRgb }}
          className="cursor-pointer hover:stroke-blue-400"
        />
        <circle
          cx={cell.x + width / 2 - 5}
          cy={cell.y + 10}
          r={3}
          fill={healthColorRgb}
          className="pointer-events-none"
        />
        <circle
          cx={cell.x + width / 2 + 5}
          cy={cell.y + 10}
          r={3}
          fill={connectionColorRgb}
          className="pointer-events-none"
        />

        <text
          x={cell.x + width / 2}
          y={cell.y + height / 2 + 5}
          textAnchor="middle"
          fontSize={fontSize - 1}
          fill={
            isActive ? 'var(--primary-500)' : 'hsl(var(--muted-foreground))'
          }
          className="select-none font-semibold"
          pointerEvents="none"
        >
          {displayName}
        </text>
      </g>
    )
  }

  const errorWidth = errorCount > 0 ? (errorCount >= 10 ? 22 : 18) : 0

  return (
    <g className={isActive ? 'z-10' : 'z-0'}>
      <rect
        x={cell.x}
        y={cell.y}
        width={width}
        height={height}
        rx={8}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        onPointerDown={(e) => {
          e.stopPropagation()
          onSelect(cell.cell.id)
        }}
        filter={isActive ? 'url(#glow)' : 'url(#inner-glow)'}
        style={{ color: healthColorRgb }}
        className="cursor-pointer hover:stroke-blue-400"
      />

      <circle
        cx={cell.x + width / 2}
        cy={cell.y + 14}
        r={4.5}
        fill={healthColorRgb}
        className="pointer-events-none"
      />

      <text
        x={cell.x + width / 2}
        y={cell.y + height / 2 + 4}
        textAnchor="middle"
        fontSize={fontSize}
        fill={isActive ? 'var(--primary-500)' : 'hsl(var(--muted-foreground))'}
        className="select-none font-bold"
        pointerEvents="none"
      >
        {displayName}
      </text>

      <g className="pointer-events-none">
        <circle
          cx={
            errorCount > 0
              ? cell.x + width / 2 - (errorWidth / 2 + 4)
              : cell.x + width / 2
          }
          cy={cell.y + height - 12}
          r={3}
          fill={connectionColorRgb}
        />

        {errorCount > 0 && (
          <g>
            <rect
              x={cell.x + width / 2 - (errorWidth / 2 - 6)}
              y={cell.y + height - 19}
              width={errorWidth}
              height={14}
              rx={3}
              fill={badgeFill}
            />
            <text
              x={cell.x + width / 2 - (errorWidth / 2 - 6) + errorWidth / 2}
              y={cell.y + height - 9}
              textAnchor="middle"
              fontSize={9}
              fill="white"
              fontWeight="bold"
            >
              {errorCount > 9 ? '9+' : errorCount}
            </text>
          </g>
        )}
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
      prev.cell.cell.errorCount === next.cell.cell.errorCount &&
      prev.cell.cell.json === next.cell.cell.json &&
      prev.isActive === next.isActive &&
      prev.width === next.width &&
      prev.height === next.height &&
      prev.cell.x === next.cell.x &&
      prev.cell.y === next.cell.y
    )
  }
)
