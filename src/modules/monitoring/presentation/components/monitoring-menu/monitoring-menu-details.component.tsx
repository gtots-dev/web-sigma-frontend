'use client'

import { HardDrive } from 'lucide-react'
import { MonitoringCell } from '../../../domain/interfaces/monitoring-cell.interface'
import { useMonitoringMenuDetails } from '../../hooks/use-monitoring-menu-details.hook'
import { MonitoringMenuDetailsRoot } from '../monitoring-menu-details/monitoring-menu-details-root.component'
import { MonitoringMenuDetailsSection } from '../monitoring-menu-details/monitoring-menu-details-section.component'
import { MonitoringModalTrigger } from '../monitoring-modal-triggers'

interface MonitoringMenuDetailsProps {
  cell: MonitoringCell
}

export function MonitoringMenuDetails({ cell }: MonitoringMenuDetailsProps) {
  const { ups, lanes } = useMonitoringMenuDetails(cell)

  return (
    <MonitoringMenuDetailsRoot>
      <MonitoringMenuDetailsSection
        title="Unidades de Processamento e Faixas"
        icon={HardDrive}
      >
        {ups.length > 0 ? (
          ups.map((up) => {
            const associatedLanes = lanes.filter(
              (lane) => lane.up_id === up.up_id
            )

            return (
              <div
                key={up.up_id}
                className="border border-border/50 bg-muted/5 dark:bg-zinc-950/5 rounded-lg p-2 flex flex-col gap-2 relative mb-3"
              >
                <MonitoringModalTrigger.ViewMoreProcessingUnit data={up} />

                {associatedLanes.length > 0 && (
                  <div className="flex flex-col gap-1.5 ml-5 relative">
                    <div className="absolute left-[-10px] top-[-8px] bottom-[16px] w-[1px] bg-border/60 pointer-events-none" />

                    {associatedLanes.map((lane) => (
                      <MonitoringModalTrigger.ViewMoreLane
                        key={lane.lane_id}
                        data={lane}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <div className="text-xs text-muted-foreground italic px-2 py-1">
            Nenhuma UP vinculada
          </div>
        )}
      </MonitoringMenuDetailsSection>
    </MonitoringMenuDetailsRoot>
  )
}
