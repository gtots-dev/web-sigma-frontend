'use client'

import { useRestrictionStore } from '@/modules/restrictions/presentation/stores/restrictions.store'
import { useInfractionGrid } from './infractions-grid-provider.component'

export function InfractionsGridHeaderRestrictionComponent() {
  const infraction = useInfractionGrid()
  const { restrictions } = useRestrictionStore()

  const ids = Array.from(
    new Set([
      ...(infraction.restriction_id != null ? [infraction.restriction_id] : []),
      ...(infraction.restrictions_id ?? [])
    ])
  )

  if (ids.length === 0) return null

  return (
    <>
      {ids.map((id) => {
        const item = restrictions.find((r) => r.id === id)
        const name = item?.name || `Restrição #${id}`
        const color = item?.color || '#3b82f6'

        return (
          <span
            key={`restriction-${id}`}
            className="h-2.5 w-2.5 rounded-[2px] shrink-0 shadow-2xs cursor-pointer transition-transform hover:scale-125"
            title={`Restrição (Quadrado): ${name}`}
            style={{ backgroundColor: color }}
          />
        )
      })}
    </>
  )
}
