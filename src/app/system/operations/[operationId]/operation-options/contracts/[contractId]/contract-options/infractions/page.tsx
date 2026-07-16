'use client'

import { use } from 'react'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { Timer } from 'lucide-react'

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
    <main className="flex flex-col flex-1 p-8 sm:p-10 gap-5">
      <div className="flex gap-5 flex-col lg:flex-row justify-between items-start lg:items-center">
        <div className="flex gap-5 flex-col lg:flex-row">
          <SectionRedirectLink.Button href={previousSection} />
          <HeaderSection.Root>
            <HeaderSection.Title>Tempo real</HeaderSection.Title>
            <HeaderSection.Description>
              Monitore, visualize e gerencie as infrações registradas em tempo
              real.
            </HeaderSection.Description>
          </HeaderSection.Root>
        </div>
      </div>
      <Separator orientation="horizontal" />

      <div className="flex flex-1 flex-col items-center justify-center border border-dashed border-border rounded-xl p-16 text-center gap-4 bg-muted/10">
        <div className="p-4 bg-primary/10 text-primary rounded-full">
          <Timer className="w-10 h-10 animate-pulse" />
        </div>
        <div className="flex flex-col gap-1 max-w-sm">
          <h3 className="font-semibold text-lg">Sem dados de tempo real</h3>
          <p className="text-sm text-muted-foreground">
            Aguardando a inicialização do fluxo de dados para exibir as
            infrações em tempo real.
          </p>
        </div>
      </div>
    </main>
  )
}
