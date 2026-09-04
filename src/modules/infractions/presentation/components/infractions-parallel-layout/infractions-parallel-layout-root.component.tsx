'use client'

import { use, useTransition, type ReactNode } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useInfractionsSocket } from '@/modules/infractions/presentation/hooks/use-infractions-socket.hook'
import { InfractionsParallelLayoutContext } from '@/modules/infractions/presentation/contexts/infractions-parallel-layout.context'

type InfractionViewMode = 'live' | 'records'

export interface InfractionsParallelLayoutRootProps {
  records: ReactNode
  live: ReactNode
  params: Promise<UrlParams>
  children: ReactNode
  className?: string
}

export function InfractionsParallelLayoutRootComponent({
  records,
  live,
  params,
  children,
  className = 'flex flex-col flex-1 min-h-0 p-4 sm:p-6 md:p-8 lg:p-10 gap-4 sm:gap-5 overflow-hidden'
}: InfractionsParallelLayoutRootProps) {
  const { contractId } = use(params)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const currentView = searchParams.get('view')?.toLowerCase()
  const viewMode: InfractionViewMode =
    currentView === 'live' ? 'live' : 'records'

  const handleViewChange = (newMode: InfractionViewMode) => {
    const newParams = new URLSearchParams(searchParams.toString())
    newMode === 'live'
      ? newParams.set('view', 'live')
      : newParams.delete('view')

    startTransition(() => {
      const queryString = newParams.toString()
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname
      router.replace(newUrl, { scroll: false })
    })
  }

  const { isConnected } = useInfractionsSocket(
    String(contractId),
    viewMode === 'live'
  )

  return (
    <InfractionsParallelLayoutContext.Provider
      value={{
        viewMode,
        handleViewChange,
        isConnected,
        records,
        live
      }}
    >
      <main className={className}>{children}</main>
    </InfractionsParallelLayoutContext.Provider>
  )
}
