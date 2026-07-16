'use client'

import { use } from 'react'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { FileVideo2 } from 'lucide-react'

interface RecordsPageProps {
  params: Promise<UrlParams>
}

export default function RecordsInfractionsPage({ params }: RecordsPageProps) {
  const { operationId, contractId } = use(params)
  const previousSection = PATHNAMES.INFRACTIONS_OPTIONS(
    Number(operationId),
    Number(contractId)
  )

  return (
    <main className="flex flex-col flex-1 p-8 sm:p-10 gap-5">
      <div className="flex gap-5 flex-col lg:flex-row">
        <SectionRedirectLink.Button href={previousSection} />
        <HeaderSection.Root>
          <HeaderSection.Title>Registros</HeaderSection.Title>
          <HeaderSection.Description>
            Consulte, filtre e analise o histórico de registros de infrações
            salvas.
          </HeaderSection.Description>
        </HeaderSection.Root>
      </div>
      <Separator orientation="horizontal" />

      <div className="flex flex-1 flex-col items-center justify-center border border-dashed border-border rounded-xl p-16 text-center gap-4 bg-muted/10">
        <div className="p-4 bg-primary/10 text-primary rounded-full">
          <FileVideo2 className="w-10 h-10" />
        </div>
        <div className="flex flex-col gap-1 max-w-sm">
          <h3 className="font-semibold text-lg">Sem registros de infrações</h3>
          <p className="text-sm text-muted-foreground">
            Aguardando a sincronização com o banco de dados para exibir a
            listagem de registros.
          </p>
        </div>
      </div>
    </main>
  )
}
