'use client'

import { use } from 'react'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { MESSAGES_INFRACTIONS } from '@/modules/shared/presentation/messages/infractions'
import { InfractionsParallelLayout } from '@/modules/infractions/presentation/components/infractions-parallel-layout'

interface RealTimePageProps {
  params: Promise<UrlParams>
}

export default function RealTimeInfractionsPage({ params }: RealTimePageProps) {
  const { operationId, contractId } = use(params)

  const previousSection = PATHNAMES.CONTRACTS_OPTIONS(
    Number(operationId),
    Number(contractId)
  )

  return (
    <HeaderSection.Root className="justify-between">
      <div className="flex items-center gap-4 min-w-0">
        <SectionRedirectLink.Button
          className="mb-5 lg:mb-0 shrink-0"
          href={previousSection}
        />
        <Separator orientation="vertical" className="h-5 hidden lg:block" />
        <div className="flex flex-col min-w-0">
          <HeaderSection.Title>
            {MESSAGES_INFRACTIONS['22.1']}
          </HeaderSection.Title>
          <HeaderSection.Description>
            {MESSAGES_INFRACTIONS['22.2']}
          </HeaderSection.Description>
        </div>
      </div>

      <InfractionsParallelLayout.Toggle />
    </HeaderSection.Root>
  )
}
