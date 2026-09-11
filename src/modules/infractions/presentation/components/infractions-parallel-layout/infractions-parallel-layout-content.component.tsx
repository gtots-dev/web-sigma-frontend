'use client'

import { useInfractionsParallelLayoutContext } from '@/modules/infractions/presentation/contexts/infractions-parallel-layout.context'

export interface InfractionsParallelLayoutContentProps {
  className?: string
}

export function InfractionsParallelLayoutContentComponent({
  className = 'flex flex-col flex-1 min-h-0 w-full overflow-hidden'
}: InfractionsParallelLayoutContentProps) {
  const { viewMode, records, live } = useInfractionsParallelLayoutContext()

  return (
    <div className={className}>
      {viewMode === 'records' ? records : live}
    </div>
  )
}
