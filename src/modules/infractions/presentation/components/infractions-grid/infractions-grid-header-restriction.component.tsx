'use client'

import { useRestrictionStore } from '@/modules/restrictions/presentation/stores/restrictions.store'
import { useInfractionGrid } from './infractions-grid-provider.component'

export function InfractionsGridHeaderRestrictionComponent() {
  const infraction = useInfractionGrid()
  const { restrictions } = useRestrictionStore()

  if (!infraction.restriction_id) return null

  const { name, color } = restrictions.find(
    (r) => r.id === infraction.restriction_id
  )

  return (
    <span
      className="h-3 w-3 rounded-full aspect-square border border-white/50"
      title={name}
      style={{ backgroundColor: color || '#000000' }}
    />
  )
}
