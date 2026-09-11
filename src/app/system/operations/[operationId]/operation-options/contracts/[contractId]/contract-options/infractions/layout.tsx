import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { InfractionsParallelLayout } from '@/modules/infractions/presentation/components/infractions-parallel-layout'

interface InfractionsLayoutProps {
  children: React.ReactNode
  records: React.ReactNode
  live: React.ReactNode
  params: Promise<UrlParams>
}

export default function InfractionsLayout({
  children,
  records,
  live,
  params
}: InfractionsLayoutProps) {
  return (
    <InfractionsParallelLayout.Root
      records={records}
      live={live}
      params={params}
    >
      {children}
      <InfractionsParallelLayout.Content />
    </InfractionsParallelLayout.Root>
  )
}
