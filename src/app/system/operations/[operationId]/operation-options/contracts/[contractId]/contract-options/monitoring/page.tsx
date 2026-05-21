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

interface MonitoringPageProps {
  params: Promise<UrlParams>
}

export default function MonitoringPage({ params }: MonitoringPageProps) {
  const { operationId, contractId } = use(params)

  const { processingUnits, isLoading } = useMonitoringMetadata(
    operationId,
    contractId
  )

  const { cells, hasFailed, isReconnecting, reconnect } =
    useMonitoringDashboardSocket(processingUnits)

  return (
    <Monitoring.Root cells={cells}>
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
            Visualização em tempo real do status e integridade de todos os
            ativos vinculados ao contrato.
          </HeaderSection.Description>
        </HeaderSection.Root>

        <Monitoring.Header.Filters>
          <Monitoring.Header.SortFilter />
          <Monitoring.Header.ConnectionFilter />
          <Monitoring.Header.StatusFilter />
        </Monitoring.Header.Filters>
      </Monitoring.Header>

      <Monitoring.Content>
        <Monitoring.Controls>
          <Monitoring.Controls.MinimizeToggle />
          <Separator orientation="vertical" />
          <Monitoring.Controls.MaximizeToggle />
          <Separator orientation="vertical" />
          <Monitoring.Controls.ModeToggle />
          <Separator orientation="vertical" />
          <Monitoring.Consumer>
            {({ mode, isMaximized }) => (
              <div className="flex items-center gap-4">
                {isMaximized && (
                  <div className="flex items-center gap-2">
                    <Monitoring.Legend />
                    <Monitoring.Stats />
                    <Separator orientation="vertical" />
                  </div>
                )}
                {mode === 'hex' && <Monitoring.Controls.LayoutToggle />}
                <Monitoring.Controls.ScalingSlider />
              </div>
            )}
          </Monitoring.Consumer>
          <Separator orientation="vertical" />
          <Monitoring.Controls.Simulation />
          <Separator orientation="vertical" />
          <Monitoring.Controls.ResetView />
        </Monitoring.Controls>

        <Monitoring.Consumer>
          {({ isMaximized }) => (
            <Monitoring.View>
              {!isMaximized && (
                <>
                  <Monitoring.Legend />
                  <Monitoring.Stats />
                </>
              )}

              {isLoading || isReconnecting ? (
                <Monitoring.Loading isReconnecting={isReconnecting} />
              ) : hasFailed ? (
                <Monitoring.Error onReconnect={reconnect} />
              ) : (
                <Monitoring.Menu>
                  {({
                    id,
                    name,
                    status,
                    connectionStatus,
                    errorCount,
                    json
                  }) => (
                    <>
                      <Monitoring.Menu.AccentBar status={status} />
                      <Monitoring.Menu.Header name={name} /> <Separator />
                      <Monitoring.Menu.Health status={status} />
                      <Separator />
                      <Monitoring.Menu.Connection
                        connectionStatus={connectionStatus}
                      />
                      <Separator />
                      <Monitoring.Menu.Meta
                        id={id}
                        errorCount={errorCount}
                        status={status}
                      />
                      <Separator />
                      <Monitoring.Menu.Payload json={json} />
                      <Separator />
                      <Monitoring.Menu.Timestamp />
                      <Separator />
                      <Monitoring.Menu.Footer />
                    </>
                  )}
                </Monitoring.Menu>
              )}
            </Monitoring.View>
          )}
        </Monitoring.Consumer>
      </Monitoring.Content>
    </Monitoring.Root>
  )
}
