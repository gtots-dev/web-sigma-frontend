'use client'

import { useInfractionGrid } from './infractions-grid-provider.component'

export function InfractionsGridHeaderDateComponent() {
  const infraction = useInfractionGrid()

  const dateRaw = infraction.response?.file?.date
  if (!dateRaw) return null

  const date = new Date(dateRaw)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  const formatted = `${day}/${month}/${year} às ${hours}:${minutes}`

  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs border border-white/15 text-[10px] font-medium text-white/90 shadow-2xs">
      {formatted}
    </span>
  )
}
