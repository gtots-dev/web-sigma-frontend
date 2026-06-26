'use client'

import { use } from 'react'
import { Monitoring } from '@/modules/monitoring/presentation/components/monitoring'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { useMonitoringMetadata } from '@/modules/monitoring/presentation/hooks/use-monitoring-metadata.hook'
import { useMonitoringDashboardSocket } from '@/modules/monitoring/presentation/hooks/use-monitoring-dashboard-socket.hook'
import type { MonitoringCell } from '@/modules/monitoring/domain/interfaces/monitoring-cell.interface'

interface MonitoringPageProps {
  params: Promise<UrlParams>
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
      <Monitoring.Consumer>
        {({ isMaximized, isSidebarOpen, setIsSidebarOpen, mode }) => {
          if (!isOverlayActive && !isSidebarOpen) {
            Promise.resolve().then(() => setIsSidebarOpen(true))
          } else if (isOverlayActive && isSidebarOpen) {
            Promise.resolve().then(() => setIsSidebarOpen(false))
          }

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
                    <Separator orientation="vertical" />
                    <Monitoring.Controls.MaximizeToggle />
                    <Separator orientation="vertical" />
                    <Monitoring.Controls.ModeToggle />
                    <Separator orientation="vertical" />
                    <div className="flex items-center gap-4">
                      {isMaximized && (
                        <div className="flex items-center gap-2">
                          <Monitoring.Legend />
                          <Monitoring.Stats.TriggerMaximized>
                            <Monitoring.Stats.Content />
                          </Monitoring.Stats.TriggerMaximized>
                          <Separator orientation="vertical" />
                        </div>
                      )}
                      {mode === 'hex' && <Monitoring.Controls.LayoutToggle />}
                      <Monitoring.Controls.ScalingSlider />
                    </div>
                    <Separator orientation="vertical" />
                    <Monitoring.Controls.TelemetryFilterToggle />
                    <Separator orientation="vertical" />
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
        }}
      </Monitoring.Consumer>
    </Monitoring.Root>
  )
}
