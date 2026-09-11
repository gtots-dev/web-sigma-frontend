'use client'

import { useInfractionGrid } from './infractions-grid-provider.component'

export function InfractionsGridImageComponent() {
  const infraction = useInfractionGrid()

  const imgSrc =
    infraction.files?.[0]?.thumbnails?.[0]?.url || infraction.files?.[0]?.url

  return (
    <div className="relative w-full aspect-square bg-muted/30 flex items-center justify-center overflow-hidden rounded-lg">
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={`Infração #${infraction.id}`}
          className="w-full h-full object-cover block transition-opacity duration-300"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-muted/20 flex items-center justify-center text-muted-foreground text-xs font-mono">
          Sem imagem
        </div>
      )}
    </div>
  )
}
