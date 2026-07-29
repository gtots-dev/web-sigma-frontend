'use client'

import type { ReactNode } from 'react'
import type { Infraction } from '@/modules/infractions/domain/interfaces/infraction.interface'
import { InfractionsGridProvider } from './infractions-grid-provider.component'
import { useInfractionsMenuTrigger } from '../../hooks/use-infractions-menu-trigger.hook'

interface InfractionsGridRootProps {
  infraction: Infraction
  animate?: boolean
  children: ReactNode
}

export function InfractionsGridRootComponent({
  infraction,
  animate = false,
  children
}: InfractionsGridRootProps) {
  const { loadPatchPointOpenDialog } = useInfractionsMenuTrigger()

  return (
    <InfractionsGridProvider infraction={infraction}>
      <div
        onClick={() => loadPatchPointOpenDialog(infraction)}
        data-infraction-card="true"
        className={`relative overflow-hidden rounded-md ${
          animate ? 'animate-in fade-in zoom-in-95 duration-300' : ''
        } group relative rounded-lg overflow-hidden flex flex-col justify-end w-full h-fit border border-border bg-card transition-all duration-300 cursor-pointer hover:border-primary/50 hover:shadow-sm`}
      >
        {children}
      </div>
    </InfractionsGridProvider>
  )
}
