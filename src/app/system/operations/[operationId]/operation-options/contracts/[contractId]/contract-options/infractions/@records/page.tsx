'use client'

import { use } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useInfractionsStore } from '@/modules/infractions/presentation/stores/infractions.store'
import { useInfractionsPagination } from '@/modules/infractions/presentation/hooks/use-infractions-pagination.hook'
import { InfractionsGrid } from '@/modules/infractions/presentation/components/infractions-grid'
import { InfractionsInitialLoading } from '@/modules/infractions/presentation/components/infractions-initial-loading'
import { InfractionsPaginationLoader } from '@/modules/infractions/presentation/components/infractions-pagination-loader'
import { InfractionsPanel } from '@/modules/infractions/presentation/components/infractions-panel'
import { InfractionsForm } from '@/modules/infractions/presentation/components/infractions-form'
import { InfractionsMenu } from '@/modules/infractions/presentation/components/infractions-menu'
import { SystemFilters } from '@/modules/shared/presentation/components/system-filters'
import { MESSAGES_INFRACTIONS } from '@/modules/shared/presentation/messages/infractions'
import { useInfractionsFilterResolver } from '@/modules/infractions/presentation/hooks/use-infractions-filter-resolver.hook'
import { useInfractionsInitialFetch } from '@/modules/infractions/presentation/hooks/use-infractions-initial-fetch.hook'

interface GridSlotPageProps {
  params: Promise<UrlParams>
}

export default function GridSlotPage({ params }: GridSlotPageProps) {
  const { operationId, contractId } = use(params)

  const {
    infractions,
    loading,
    loadingOlder,
    loadingNewer,
    hasOlder,
    hasNewer,
    pageStart,
    pageEnd,
    activeFilters
  } = useInfractionsStore()

  const { filterLabels, handleValueResolver } = useInfractionsFilterResolver()
  const { handleFilterSubmit } = useInfractionsInitialFetch({
    operationId,
    contractId
  })

  const isInitialLoad = pageStart === 1 && pageEnd === 1

  useInfractionsPagination({ operationId, contractId })

  return (
    <>
      <SystemFilters.Root className="mb-3">
        <SystemFilters.Header>
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <SystemFilters.Icon>
              <SlidersHorizontal className="w-4 h-4" />
            </SystemFilters.Icon>
            <div className="min-w-0 flex-1">
              <SystemFilters.Title>
                {MESSAGES_INFRACTIONS['22.3']}
              </SystemFilters.Title>
              <SystemFilters.Description>
                {MESSAGES_INFRACTIONS['22.4']}
              </SystemFilters.Description>
            </div>
          </div>
          <SystemFilters.Toggle
            values={activeFilters}
            labels={filterLabels}
            valueResolver={handleValueResolver}
          />
        </SystemFilters.Header>

        <SystemFilters.Body>
          <InfractionsForm.Form>
            <div className="flex flex-col gap-3 w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                <InfractionsForm.Inputs.Points />
                <InfractionsForm.Inputs.Lanes />
                <InfractionsForm.Inputs.Groups />
                <InfractionsForm.Inputs.Violations />
                <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                  <InfractionsForm.Inputs.Restrictions />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                  <InfractionsForm.Inputs.Date />
                </div>
                <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                  <InfractionsForm.Inputs.Time />
                </div>
                <div className="col-span-2 sm:col-span-1 lg:col-span-3 flex items-center">
                  <InfractionsForm.Submit
                    onSubmit={handleFilterSubmit}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </InfractionsForm.Form>
        </SystemFilters.Body>
      </SystemFilters.Root>

      <div className="flex flex-col flex-1 min-h-0 w-full">
        {loading ? (
          <InfractionsInitialLoading />
        ) : infractions.length === 0 ? (
          <InfractionsPanel.Empty />
        ) : (
          <InfractionsMenu.Provider infractions={infractions}>
            <InfractionsGrid.Container>
              <InfractionsPaginationLoader.Root
                position="top"
                loading={loadingNewer}
                hasMore={hasNewer}
              />

              {infractions.map((infraction) => (
                <InfractionsGrid.Root
                  key={infraction.id}
                  infraction={infraction}
                  animate={isInitialLoad}
                >
                  <InfractionsMenu.Trigger>
                    <InfractionsGrid.Header>
                      <InfractionsGrid.Header.Date />
                    </InfractionsGrid.Header>

                    <div className="flex flex-row items-stretch w-full flex-1 min-h-0 bg-card">
                      <div className="flex-1 aspect-square min-w-0 overflow-hidden">
                        <InfractionsGrid.Image />
                      </div>

                      <div className="w-[22px] self-stretch bg-muted/40 border-l border-border/60 flex flex-col items-center justify-between py-1.5 gap-1.5 shrink-0">
                        <div className="flex flex-col items-center gap-1.5">
                          <InfractionsGrid.Header.Violation />
                          <InfractionsGrid.Header.Restriction />
                        </div>
                      </div>
                    </div>
                  </InfractionsMenu.Trigger>
                </InfractionsGrid.Root>
              ))}

              <InfractionsPaginationLoader.Root
                position="bottom"
                loading={loadingOlder}
                hasMore={hasOlder}
              />
            </InfractionsGrid.Container>

            <InfractionsMenu.Dialog />
          </InfractionsMenu.Provider>
        )}
      </div>
    </>
  )
}
