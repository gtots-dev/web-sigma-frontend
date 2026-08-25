'use client'

import { useViolationStore } from '@/modules/violations/presentation/stores/violations.store'
import { useInfractionGrid } from './infractions-grid-provider.component'

export function InfractionsGridHeaderViolationComponent() {
  const infraction = useInfractionGrid()
  const { violations } = useViolationStore()

  const rawIds = (infraction as { violations_id?: number[] }).violations_id
  const ids = Array.from(
    new Set([
      ...(infraction.violation_id != null ? [infraction.violation_id] : []),
      ...(rawIds ?? [])
    ])
  )

  if (ids.length === 0) return null

  return (
    <>
      {ids.map((id) => {
        const item = violations.find((v) => v.id === id)
        const name = item?.name || `Violação #${id}`
        const color = item?.color || '#ef4444'

        return (
          <span
            key={`violation-${id}`}
            className="h-2.5 w-2.5 rounded-full shrink-0 shadow-2xs cursor-pointer transition-transform hover:scale-125"
            title={`Violação (Círculo): ${name}`}
            style={{ backgroundColor: color }}
          />
        )
      })}
    </>
  )
}
