'use client'

import { useInfractionGrid } from './infractions-grid-provider.component'

export function InfractionsGridHeaderComponent() {
  const infraction = useInfractionGrid()
  const dateRaw = infraction.response?.file?.date
  const dateFormatted = dateRaw ? dateRaw.split('T')[0].split(' ')[0] : ''

  return (
    <div className="absolute top-0 inset-x-0 pb-6 pt-1 px-1 flex items-center justify-between pointer-events-none z-10">
      <span className="inline-flex items-center px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs border border-white/15 text-[10px] font-medium text-white/90 shadow-2xs">
        {dateFormatted}
      </span>
    </div>
  )
}
