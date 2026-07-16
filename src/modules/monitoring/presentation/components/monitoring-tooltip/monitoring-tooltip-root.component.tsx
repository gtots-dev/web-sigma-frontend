'use client'

import type { ReactNode, CSSProperties, RefObject } from 'react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { MonitoringTooltipRenderer } from './monitoring-tooltip-renderer.component'
import type { MonitoringCell } from '../../../domain/interfaces/monitoring-cell.interface'

export interface MonitoringTooltipProps {
  children?: ReactNode | ((cell: MonitoringCell) => ReactNode)
  className?: string
  renderContainer?: (props: {
    cell: MonitoringCell
    children: ReactNode
    style: CSSProperties
    ref: RefObject<HTMLDivElement>
  }) => ReactNode
}

export function MonitoringTooltip({
  children,
  className,
  renderContainer
}: MonitoringTooltipProps) {
  const {
    hoveredCell,
    hoveredCellId,
    containerRef,
    setHoveredCellId
  } = useMonitoringContext()

  if (!hoveredCell) return null

  return (
    <MonitoringTooltipRenderer
      cell={hoveredCell}
      children={children}
      className={className}
      renderContainer={renderContainer}
      hoveredCellId={hoveredCellId}
      setHoveredCellId={setHoveredCellId}
      containerRef={containerRef}
    />
  )
}
