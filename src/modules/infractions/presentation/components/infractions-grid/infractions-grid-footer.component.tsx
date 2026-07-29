'use client'

import { useInfractionGrid } from './infractions-grid-provider.component'

export function InfractionsGridFooterComponent() {
  const infraction = useInfractionGrid()
  const meta = infraction.response?.metadata?.[0]
  if (!meta) return null

  return (
    <div className="absolute bottom-0 inset-x-0 pt-6 pb-1 px-1 flex items-end justify-between z-10">
      <span className="inline-flex items-center px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs border border-white/15 font-semibold text-[11px] tracking-wider uppercase text-white drop-shadow-xs">
        {meta.plate}
      </span>
    </div>
  )
}
