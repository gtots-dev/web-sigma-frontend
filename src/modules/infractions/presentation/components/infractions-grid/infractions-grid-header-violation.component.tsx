'use client'

import { useViolationStore } from '@/modules/violations/presentation/stores/violations.store'
import { useInfractionGrid } from './infractions-grid-provider.component'

export function InfractionsGridHeaderViolationComponent() {
  const infraction = useInfractionGrid()
  const { violations } = useViolationStore()

  if (!infraction.violation_id) return null

  const { name, color } = violations.find(
    (v) => v.id === infraction.violation_id
  )

  return (
    <span
      className="h-3 w-3 rounded-full aspect-square border border-white/50"
      title={name}
      style={{ backgroundColor: color || '#000000' }}
    />
  )
}
