'use client'

import { useInfractionGrid } from './infractions-grid-provider.component'

export function InfractionsGridFooterPlateComponent() {
  const infraction = useInfractionGrid()
  const plate = infraction.response?.metadata?.[0]?.plate

  if (!plate) return null

  return (
    <span
      className="font-mono font-bold text-[9px] tracking-widest text-primary uppercase select-none opacity-85"
      style={{ writingMode: 'vertical-rl' }}
      title={`Placa: ${plate}`}
    >
      {plate}
    </span>
  )
}
