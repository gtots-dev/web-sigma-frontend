'use client'

import type { ReactNode } from 'react'
import type { Infraction } from '@/modules/infractions/domain/interfaces/infraction.interface'
import { useInfractionsMenuTrigger } from '../../hooks/use-infractions-menu-trigger.hook'
import { useInfractionGrid } from '../infractions-grid'

interface InfractionsMenuTriggerProps {
  infraction?: Infraction
  children: ReactNode
  className?: string
}

export function InfractionsMenuTriggerComponent({
  infraction: propInfraction,
  children,
  className = 'cursor-pointer'
}: InfractionsMenuTriggerProps) {
  const { loadInfractionOpenDialog } = useInfractionsMenuTrigger()
  const contextInfraction = useInfractionGrid()
  const infraction = propInfraction ?? contextInfraction

  return (
    <div
      onClick={() => infraction && loadInfractionOpenDialog(infraction)}
      className={className}
    >
      {children}
    </div>
  )
}
