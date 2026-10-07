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
import { MESSAGES_OPTIONS_CONTRACT } from '@/modules/shared/presentation/messages/options-contract'

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
  const { isMaximized, setIsSidebarOpen } = useMonitoringContext()

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
            <HeaderSection.Root>
              <SectionRedirectLink.Button
                href={PATHNAMES.CONTRACTS_OPTIONS(
                  Number(operationId),
                  Number(contractId)
                )}
              />
              <Separator
                orientation="vertical"
                className="h-5 shrink-0 hidden sm:block"
              />
              <div className="flex flex-col min-w-0 flex-1">
                <HeaderSection.Title>
                  {MESSAGES_OPTIONS_CONTRACT['16.11']}
                </HeaderSection.Title>
                <HeaderSection.Description>
                  {MESSAGES_OPTIONS_CONTRACT['16.12']}
                </HeaderSection.Description>
              </div>
            </HeaderSection.Root>
          </Monitoring.Header>

          <Monitoring.Header.Filters>
            <Monitoring.Header.SortFilter />
            <Monitoring.Header.ConnectionFilter />
            <Monitoring.Header.StatusFilter />
            <Monitoring.Header.UpFilter />
          </Monitoring.Header.Filters>
        </>
      )}

      <Monitoring.Content>
        <div className="flex flex-row flex-1 h-full w-full relative">
          <Monitoring.View>
            {!isOverlayActive && (
              <Monitoring.Controls>
                {/* Grupo 1: Modos Principais */}
                <Monitoring.Controls.ModeToggle />

                {/* Grupo 2: Submodo de Layout (Condicionado ao Hex) */}
                <Monitoring.Controls.LayoutToggle />

                <Separator orientation="vertical" className="h-5 w-[1px] hidden sm:block bg-border/80" />

                {/* Grupo 3: Ações de Viewport e Zoom */}
                <Monitoring.Controls.ScalingSlider />
                <Monitoring.Controls.ResetView />

                <Separator orientation="vertical" className="h-5 w-[1px] hidden sm:block bg-border/80" />

                {/* Grupo 4: Painéis, Estado & Utilitários */}
                {isMaximized && (
                  <div className="flex items-center gap-2">
                    <Monitoring.Legend />
                    <Monitoring.Stats.TriggerMaximized>
                      <Monitoring.Stats.Content />
                    </Monitoring.Stats.TriggerMaximized>
                    <Separator orientation="vertical" className="h-5 w-[1px] hidden sm:block bg-border/80" />
                  </div>
                )}
                <Monitoring.Controls.TelemetryFilterToggle />
                <Monitoring.Controls.MaximizeToggle />
                <Monitoring.Controls.MinimizeToggle />
              </Monitoring.Controls>
            )}

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
                        <Monitoring.Menu.AccentBar status={cell.status} />
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
