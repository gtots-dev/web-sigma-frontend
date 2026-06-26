'use client'

import { use, useEffect } from 'react'
import { Monitoring } from '@/modules/monitoring/presentation/components/monitoring'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { useMonitoringMetadata } from '@/modules/monitoring/presentation/hooks/use-monitoring-metadata.hook'
import { useMonitoringDashboardSocket } from '@/modules/monitoring/presentation/hooks/use-monitoring-dashboard-socket.hook'
import type { MonitoringCell } from '@/modules/monitoring/domain/interfaces/monitoring-cell.interface'
import { useMonitoringContext } from '@/modules/monitoring/presentation/components/monitoring/monitoring-context.component'

interface MonitoringPageProps {
  params: Promise<UrlParams>
}

function MonitoringPageContent({
  operationId,
  contractId,
  isOverlayActive,
  reconnect,
  isReconnecting,
  hasFailed
}: {
  operationId: string
  contractId: string
  isOverlayActive: boolean
  reconnect: () => void
  isReconnecting: boolean
  hasFailed: boolean
}) {
  const { isMaximized, isSidebarOpen, setIsSidebarOpen, mode } = useMonitoringContext()

  // Sincroniza o estado inicial do menu lateral após o carregamento
  useEffect(() => {
    if (!isOverlayActive) {
      setIsSidebarOpen(true)
    } else {
      setIsSidebarOpen(false)
    }
  }, [isOverlayActive, setIsSidebarOpen])

  return (
    <>
      {!isMaximized && (
        <>
          <Monitoring.Header>
            <SectionRedirectLink.Button
              href={PATHNAMES.CONTRACTS_OPTIONS(
                Number(operationId),
                Number(contractId)
              )}
            />
            <HeaderSection.Root>
              <HeaderSection.Title>
                Monitoramento de Equipamentos
              </HeaderSection.Title>
              <HeaderSection.Description>
                Visualização em tempo real do status e integridade de
                todos os ativos vinculados ao contrato.
              </HeaderSection.Description>
            </HeaderSection.Root>
          </Monitoring.Header>

          <Separator />

          <Monitoring.Header.Filters>
            <Monitoring.Header.SortFilter />
            <Monitoring.Header.ConnectionFilter />
            <Monitoring.Header.StatusFilter />
            <Monitoring.Header.UpFilter />
          </Monitoring.Header.Filters>
        </>
      )}

      <Monitoring.Content>
        {!isOverlayActive && (
          <Monitoring.Controls>
            <Monitoring.Controls.MinimizeToggle />
            <Separator className="h-[1px] w-full md:h-full md:w-[1px]" />
            <Monitoring.Controls.MaximizeToggle />
            <Separator className="h-[1px] w-full md:h-full md:w-[1px]" />
            <Monitoring.Controls.ModeToggle />
            <Separator className="h-[1px] w-full md:h-full md:w-[1px]" />
            <div className="flex flex-col md:flex-row items-center gap-4">
              {isMaximized && (
                <div className="flex items-center gap-2">
                  <Monitoring.Legend />
                  <Monitoring.Stats.TriggerMaximized>
                    <Monitoring.Stats.Content />
                  </Monitoring.Stats.TriggerMaximized>
                  <Separator className="h-[1px] w-full md:h-full md:w-[1px]" />
                </div>
              )}
              {mode === 'hex' && <Monitoring.Controls.LayoutToggle />}
              <Monitoring.Controls.ScalingSlider />
            </div>
            <Separator className="h-[1px] w-full md:h-full md:w-[1px]" />
            <Monitoring.Controls.TelemetryFilterToggle />
            <Separator className="h-[1px] w-full md:h-full md:w-[1px]" />
            <Monitoring.Controls.ResetView />
          </Monitoring.Controls>
        )}

        <div className="flex flex-row flex-1 h-full w-full relative overflow-hidden">
          <Monitoring.View>
            {!isMaximized && (
              <div className="absolute top-4 right-4 z-20 flex items-start pointer-events-none gap-2">
                <div className="pointer-events-auto">
                  <Monitoring.Legend />
                </div>
                <div className="pointer-events-auto">
                  <Monitoring.Stats>
                    <Monitoring.Stats.Content />
                  </Monitoring.Stats>
                </div>
              </div>
            )}

            {hasFailed ? (
              <Monitoring.Error onReconnect={reconnect} />
            ) : isOverlayActive ? (
              <Monitoring.Loading isReconnecting={isReconnecting} />
            ) : (
              <>
                <Monitoring.Tooltip />
                <Monitoring.Menu>
                  {(cell: MonitoringCell) => (
                    <>
                      {cell.connectionStatus === 'online' && (
                        <Monitoring.Menu.AccentBar
                          status={cell.status}
                        />
                      )}
                      <Monitoring.Menu.Header name={cell.name} />
                      <Separator />
                      <Monitoring.Menu.Connection
                        connectionStatus={cell.connectionStatus}
                      />
                      <Separator />
                      <Monitoring.Menu.Details cell={cell} />
                      <Separator />
                      <Monitoring.Menu.Footer />
                    </>
                  )}
                </Monitoring.Menu>
              </>
            )}
          </Monitoring.View>

          <Monitoring.SidebarFilters />
        </div>
      </Monitoring.Content>
    </>
  )
}

export default function MonitoringPage({ params }: MonitoringPageProps) {
  const { operationId, contractId } = use(params)

  const { unifiedNodes, isLoading } = useMonitoringMetadata(
    operationId,
    contractId
  )

  const {
    cells,
    hasFailed,
    isReconnecting,
    reconnect,
    hasReceivedInitialData
  } = useMonitoringDashboardSocket(unifiedNodes, contractId)

  const isOverlayActive =
    hasFailed ||
    isLoading ||
    (unifiedNodes.length > 0 && !hasReceivedInitialData) ||
    isReconnecting

  return (
    <Monitoring.Root cells={cells}>
      <MonitoringPageContent
        operationId={operationId}
        contractId={contractId}
        isOverlayActive={isOverlayActive}
        reconnect={reconnect}
        isReconnecting={isReconnecting}
        hasFailed={hasFailed}
      />
    </Monitoring.Root>
  )
}
