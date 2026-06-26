'use client'

import { useState, type ReactNode, type RefObject } from 'react'
import { Cpu, Layers, SlidersHorizontal } from 'lucide-react'
import { useMonitoringTooltip } from '../../hooks/use-monitoring-tooltip.hook'
import { MonitoringTooltipBox } from './monitoring-tooltip-box.component'
import { MonitoringTooltipEntityBlock } from './monitoring-tooltip-entity-block.component'
import type { MonitoringCell } from '../../../domain/interfaces/monitoring-cell.interface'
import type { MonitoringTooltipProps } from './monitoring-tooltip-root.component'
import type { UpInfo, LaneInfo } from '../../hooks/use-monitoring-menu-details.hook'
import { MultiSelect } from '@/modules/shared/presentation/components/multi-select/multi-select.component'

interface MonitoringTooltipRendererProps {
  cell: MonitoringCell
  children?: ReactNode | ((cell: MonitoringCell) => ReactNode)
  className?: string
  renderContainer?: MonitoringTooltipProps['renderContainer']
  hoveredCellId: string | null
  setHoveredCellId: (id: string | null) => void
  containerRef: RefObject<HTMLDivElement>
}

function TooltipLaneAccordion({ lane, selectedLevels }: { lane: LaneInfo; selectedLevels: number[] }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <MonitoringTooltipEntityBlock
      icon={Layers}
      name={lane.name}
      level={lane.level}
      hasData={lane.hasData}
      offline={false}
      items={lane.items}
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      selectedLevels={selectedLevels}
    />
  )
}

function TooltipUPAccordion({
  up,
  associatedLanes,
  selectedLevels
}: {
  up: UpInfo
  associatedLanes: LaneInfo[]
  selectedLevels: number[]
}) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="flex flex-col gap-1.5">
      <MonitoringTooltipEntityBlock
        icon={Cpu}
        name={up.name}
        level={up.level}
        hasData={up.hasData}
        offline={up.offline}
        items={up.items}
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        selectedLevels={selectedLevels}
      />

      {isOpen && associatedLanes.length > 0 && (
        <div className="flex flex-col gap-1.5 ml-4 relative">
          <div className="absolute left-[-10px] top-0 bottom-3 w-[1px] bg-border/50 pointer-events-none" />
          {associatedLanes.map((lane) => (
            <div key={lane.lane_id} className="relative">
              <div className="absolute -left-[10px] top-1/2 -translate-y-1/2 w-[10px] h-[1px] bg-border/50 pointer-events-none" />
              <TooltipLaneAccordion lane={lane} selectedLevels={selectedLevels} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
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

  const [selectedLevels, setSelectedLevels] = useState<number[]>([0, 1, 2])

  const filterOptions = [
    { id: 0, label: 'Normal', color: 'rgb(var(--monitoring-ok))' },
    { id: 1, label: 'Atenção', color: 'rgb(var(--monitoring-warning))' },
    { id: 2, label: 'Crítico', color: 'rgb(var(--monitoring-error))' }
  ]

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

  const defaultContent = (
    <div className="flex flex-col w-full h-full max-h-[500px] overflow-hidden rounded-lg bg-card text-card-foreground">
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 relative shrink-0">
        <span className="text-[11px] font-bold text-foreground tracking-wide">
          Status da Célula
        </span>
        <div className="relative flex items-center">
          <MultiSelect
            items={filterOptions}
            value={selectedLevels}
            onChange={(val) => setSelectedLevels(val as number[])}
            placeholder="Filtrar"
            leftIcon={SlidersHorizontal}
            dotColor={(item) => item.color}
            minSelected={1}
            popoverAlign="end"
            popoverWidth={150}
            popoverClassName="z-[200]"
            searchable={false}
            className="h-7 w-8 p-0 flex items-center justify-center border-none bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-none [&>svg:last-child]:hidden [&>div>div]:hidden [&>div]:w-auto [&>div]:justify-center [&>div]:gap-0"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2.5 flex flex-col gap-2">
        {ups.length === 0 && (
          <p className="text-xs text-muted-foreground italic text-center py-1">
            Nenhuma UP vinculada
          </p>
        )}

        {ups.map((up) => {
          const associatedLanes = sortedLanesByUp(up.up_id)

          const filteredLanes = associatedLanes.filter((lane) =>
            selectedLevels.includes(lane.level)
          )

          const isUpVisible = selectedLevels.includes(up.level) || filteredLanes.length > 0
          if (!isUpVisible) return null

          return (
            <TooltipUPAccordion
              key={up.up_id}
              up={up}
              associatedLanes={filteredLanes}
              selectedLevels={selectedLevels}
            />
          )
        })}
      </div>
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
