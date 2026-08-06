'use client'

import { use } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { useInfractionsStore } from '@/modules/infractions/presentation/stores/infractions.store'
import { useInfractionsPagination } from '@/modules/infractions/presentation/hooks/use-infractions-pagination.hook'
import { InfractionsGrid } from '@/modules/infractions/presentation/components/infractions-grid'
import { InfractionsInitialLoading } from '@/modules/infractions/presentation/components/infractions-initial-loading'
import { InfractionsPaginationLoader } from '@/modules/infractions/presentation/components/infractions-pagination-loader'
import { InfractionsForm } from '@/modules/infractions/presentation/components/infractions-form'
import { InfractionsMenu } from '@/modules/infractions/presentation/components/infractions-menu'
import { SystemFilters } from '@/modules/shared/presentation/components/system-filters'
import { MESSAGES_INFRACTIONS } from '@/modules/shared/presentation/messages/infractions'
import { useInfractionsFilterResolver } from '@/modules/infractions/presentation/hooks/use-infractions-filter-resolver.hook'
import { useInfractionsInitialFetch } from '@/modules/infractions/presentation/hooks/use-infractions-initial-fetch.hook'

interface RealTimePageProps {
  params: Promise<UrlParams>
}

export default function RealTimeInfractionsPage({ params }: RealTimePageProps) {
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
  const previousSection = PATHNAMES.CONTRACTS_OPTIONS(
    Number(operationId),
    Number(contractId)
  )

  return (
    <main className="flex flex-col flex-1 min-h-0 p-4 sm:p-6 md:p-8 lg:p-10 gap-4 sm:gap-5 overflow-hidden">
      <HeaderSection.Root>
        <SectionRedirectLink.Button
          className="mb-5 lg:mb-0"
          href={previousSection}
        />
        <Separator orientation="vertical" className="h-5 hidden lg:block" />
        <HeaderSection.Title>
          {MESSAGES_INFRACTIONS['22.1']}
        </HeaderSection.Title>
        <HeaderSection.Description>
          {MESSAGES_INFRACTIONS['22.2']}
        </HeaderSection.Description>
      </HeaderSection.Root>

      <SystemFilters.Root>
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
        {loading || infractions.length <= 0 ? (
          <InfractionsInitialLoading />
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
                      <InfractionsGrid.Header.Violation />
                      <InfractionsGrid.Header.Restriction />
                    </InfractionsGrid.Header>

                    <InfractionsGrid.Image />

                    <InfractionsGrid.Footer>
                      <InfractionsGrid.Footer.Plate />
                    </InfractionsGrid.Footer>
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
    </main>
  )
}
