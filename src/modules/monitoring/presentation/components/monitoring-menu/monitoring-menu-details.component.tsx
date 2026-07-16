'use client'

import { HardDrive } from 'lucide-react'
import { MonitoringCell } from '../../../domain/interfaces/monitoring-cell.interface'
import { useMonitoringMenuDetails } from '../../hooks/use-monitoring-menu-details.hook'
import { MonitoringMenuDetailsRoot } from './details/monitoring-menu-details-root.component'
import { MonitoringMenuDetailsSection } from './details/monitoring-menu-details-section.component'
import { MonitoringMenuDetailsItem } from './details/monitoring-menu-details-item.component'
import { MonitoringMenuDetailsDialog } from './details/monitoring-menu-details-dialog.component'

interface MonitoringMenuDetailsProps {
  cell: MonitoringCell
}

export function MonitoringMenuDetails({ cell }: MonitoringMenuDetailsProps) {
  const {
    ups,
    lanes,
    activeDialog,
    accessing,
    handleAccess,
    closeDialog,
    dialogData
  } = useMonitoringMenuDetails(cell)

  return (
    <>
      <MonitoringMenuDetailsRoot>
        {/* Unidades de Processamento e Faixas Aninhadas */}
        <MonitoringMenuDetailsSection title="Unidades de Processamento e Faixas" icon={HardDrive}>
          {ups.length > 0 ? (
            ups.map((up) => {
              // Filtrar as faixas vinculadas a esta UP
              const associatedLanes = lanes.filter((lane) => lane.up_id === up.up_id)
              
              return (
                <div key={up.up_id} className="border border-border/50 bg-muted/5 dark:bg-zinc-950/5 rounded-lg p-2 flex flex-col gap-2 relative mb-3">
                  <MonitoringMenuDetailsItem
                    data={up}
                    isAccessing={accessing?.type === 'up' && accessing?.id === String(up.up_id)}
                    onAccess={() => !accessing && handleAccess('up', String(up.up_id))}
                  />
                  
                  {associatedLanes.length > 0 && (
                    <div className="flex flex-col gap-1.5 ml-5 relative">
                      {/* Linha guia vertical para aninhamento */}
                      <div className="absolute left-[-10px] top-[-8px] bottom-[16px] w-[1px] bg-border/60 pointer-events-none" />
                      
                      {associatedLanes.map((lane) => (
                        <MonitoringMenuDetailsItem
                          key={lane.lane_id}
                          data={lane}
                          isNested
                          isAccessing={accessing?.type === 'lane' && accessing?.id === String(lane.lane_id)}
                          onAccess={() => !accessing && handleAccess('lane', String(lane.lane_id))}
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

      {/* Modal / Dialog de Detalhes da UP/Lane */}
      <MonitoringMenuDetailsDialog
        isOpen={activeDialog.type !== 'list'}
        onClose={closeDialog}
        {...dialogData}
      />
    </>
  )
}
