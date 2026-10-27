interface InfractionsTimelineItemImageProps {
  src: string | null
  alt?: string
}

export function InfractionsTimelineItemImage({
  src,
  alt = 'Registro'
}: InfractionsTimelineItemImageProps) {
  if (!src) return null

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  )
}
