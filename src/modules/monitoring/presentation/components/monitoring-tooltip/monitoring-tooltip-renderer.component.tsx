'use client'

import type { ReactNode, RefObject } from 'react'
import { Cpu, Layers } from 'lucide-react'
import { useMonitoringTooltip } from '../../hooks/use-monitoring-tooltip.hook'
import { MonitoringTooltipBox } from './monitoring-tooltip-box.component'
import { MonitoringTooltipEntityBlock } from './monitoring-tooltip-entity-block.component'
import type { MonitoringCell } from '../../../domain/interfaces/monitoring-cell.interface'
import type { MonitoringTooltipProps } from './monitoring-tooltip-root.component'

interface MonitoringTooltipRendererProps {
  cell: MonitoringCell
  children?: ReactNode | ((cell: MonitoringCell) => ReactNode)
  className?: string
  renderContainer?: MonitoringTooltipProps['renderContainer']
  hoveredCellId: string | null
  setHoveredCellId: (id: string | null) => void
  containerRef: RefObject<HTMLDivElement>
}

export function MonitoringTooltipRenderer({
  cell,
  children,
  className,
  renderContainer,
  hoveredCellId,
  setHoveredCellId,
  containerRef
}: MonitoringTooltipRendererProps) {
  const { ups, tooltipRef, positionStyle, sortedLanesByUp } =
    useMonitoringTooltip(cell, containerRef)

  // Conteúdo customizado via children prop
  if (children) {
    const content = typeof children === 'function' ? children(cell) : children
    if (content === null) return null

    if (renderContainer) {
      return renderContainer({ cell, children: content, style: positionStyle, ref: tooltipRef })
    }

    return (
      <MonitoringTooltipBox
        tooltipRef={tooltipRef}
        positionStyle={positionStyle}
        className={className}
        hoveredCellId={hoveredCellId}
        setHoveredCellId={setHoveredCellId}
      >
        {content}
      </MonitoringTooltipBox>
    )
  }

  // Conteúdo padrão: exibe todas as UPs e suas Lanes
  const defaultContent = (
    <div className="flex flex-col gap-2 w-full">
      {ups.length === 0 && (
        <p className="text-xs text-muted-foreground italic text-center py-1">
          Nenhuma UP vinculada
        </p>
      )}

      {ups.map((up) => {
        const associatedLanes = sortedLanesByUp(up.up_id)

        return (
          <div key={up.up_id} className="flex flex-col gap-1.5">
            <MonitoringTooltipEntityBlock
              icon={Cpu}
              name={up.name}
              level={up.level}
              hasData={up.hasData}
              offline={up.offline}
              items={up.items}
            />

            {associatedLanes.length > 0 && (
              <div className="flex flex-col gap-1.5 ml-4 relative">
                <div className="absolute left-[-10px] top-0 bottom-3 w-[1px] bg-border/50 pointer-events-none" />
                {associatedLanes.map((lane) => (
                  <div key={lane.lane_id} className="relative">
                    <div className="absolute -left-[10px] top-1/2 -translate-y-1/2 w-[10px] h-[1px] bg-border/50 pointer-events-none" />
                    <MonitoringTooltipEntityBlock
                      icon={Layers}
                      name={lane.name}
                      level={lane.level}
                      hasData={lane.hasData}
                      offline={false}
                      items={lane.items}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )

  if (renderContainer) {
    return renderContainer({ cell, children: defaultContent, style: positionStyle, ref: tooltipRef })
  }

  return (
    <MonitoringTooltipBox
      tooltipRef={tooltipRef}
      positionStyle={positionStyle}
      className={className}
      hoveredCellId={hoveredCellId}
      setHoveredCellId={setHoveredCellId}
    >
      {defaultContent}
    </MonitoringTooltipBox>
  )
}
