'use client'

import { useInfractionGrid } from './infractions-grid-provider.component'

export function InfractionsGridImageComponent() {
  const infraction = useInfractionGrid()
  const meta = infraction.response?.metadata?.[0]
  const imgSrc = infraction.response?.file?.url

  return (
    <img
      src={imgSrc}
      alt={infraction.response?.file?.name || meta?.type || 'Infração'}
      className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-105"
    />
  )
}
