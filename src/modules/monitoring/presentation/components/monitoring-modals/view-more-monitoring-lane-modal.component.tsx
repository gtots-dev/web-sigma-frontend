'use client'

import dynamic from 'next/dynamic'
import { Layers } from 'lucide-react'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { MonitoringMenuDetailsStatusGroup } from '../monitoring-menu-details/monitoring-menu-details-status-group.component'
import {
  getLevelColor,
  getLevelText
} from '../../utils/monitoring-menu-details.utils'
import { useMonitoringLaneById } from '../../hooks/use-monitoring-details-by-id.hook'

const MonitoringMenuMapSnapshot = dynamic(
  () =>
    import('../monitoring-menu/monitoring-menu-map-snapshot.component').then(
      (mod) => mod.MonitoringMenuMapSnapshot
    ),
  { ssr: false }
)

export interface ViewMoreMonitoringLaneModalProps {
  laneId: number
  onClose?: () => void
  onReturn?: () => void
}

export function ViewMoreMonitoringLaneModal({
  laneId,
  onClose,
  onReturn
}: ViewMoreMonitoringLaneModalProps) {
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { lane, cell, title, hasData, offline, level, items, loading } =
    useMonitoringLaneById(laneId)

  if (!loading && !lane) {
    return (
      <ModalShell.Empty
        title="Faixa não encontrada"
        description={`A faixa solicitada com o ID ${laneId} não existe ou foi removida.`}
        onReturn={handleReturn}
      />
    )
  }

  return (
    <ModalShell.Root>
      <ModalShell.Loading when={loading} />

      {!loading && lane && (
        <>
          <ModalShell.Header
            className="!h-auto"
            title={
              <span className="flex items-center gap-2 text-base font-bold text-foreground">
                <Layers size={18} className="text-muted-foreground" />
                <span>{title}</span>
              </span>
            }
            description={
              <span className="flex items-center gap-2 mt-1.5">
                <span
                  className={`h-2.5 w-2.5 rounded-full shrink-0 ${getLevelColor(
                    level,
                    hasData,
                    offline
                  )}`}
                />
                <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">
                  {getLevelText(level, hasData, offline)}
                </span>
              </span>
            }
          />

          <ModalShell.Content className="px-6 py-4 flex flex-col gap-2">
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">
                LOCALIZAÇÃO
              </span>
              <MonitoringMenuMapSnapshot cell={cell} />
            </div>

            {items.length > 0 ? (
              items.map((group) => (
                <MonitoringMenuDetailsStatusGroup
                  key={group.group}
                  group={group}
                />
              ))
            ) : (
              <div className="text-sm text-muted-foreground italic text-center py-10 bg-muted/10 border border-dashed rounded-lg">
                Aguardando dados em tempo real...
              </div>
            )}
          </ModalShell.Content>

          <ModalShell.Footer>
            <Button
              className="w-full sm:w-[150px]"
              variant="outline"
              type="button"
              onClick={handleClose}
            >
              Fechar
            </Button>
          </ModalShell.Footer>
        </>
      )}
    </ModalShell.Root>
  )
}
