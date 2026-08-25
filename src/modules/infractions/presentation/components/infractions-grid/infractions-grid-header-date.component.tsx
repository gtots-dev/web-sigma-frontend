'use client'

import { useInfractionGrid } from './infractions-grid-provider.component'

export function InfractionsGridHeaderDateComponent() {
  const infraction = useInfractionGrid()

  const dateRaw = infraction.response?.file?.date || infraction.date
  if (!dateRaw) return null

  const date = new Date(dateRaw)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  const formatted = `${day}/${month}/${year} às ${hours}:${minutes}`

  return (
    <span className="text-[10px] font-semibold text-foreground/90 font-mono tracking-tight leading-none">
      {formatted}
    </span>
  )
}
