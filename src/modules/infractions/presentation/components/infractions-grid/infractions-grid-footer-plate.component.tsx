'use client'

import { useInfractionGrid } from './infractions-grid-provider.component'

export function InfractionsGridFooterPlateComponent() {
  const infraction = useInfractionGrid()
  const plate = infraction.response?.metadata?.[0]?.plate

  if (!plate) return null

  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs border border-white/15 font-semibold text-[11px] tracking-wider uppercase text-white drop-shadow-xs">
      {plate}
    </span>
  )
}
