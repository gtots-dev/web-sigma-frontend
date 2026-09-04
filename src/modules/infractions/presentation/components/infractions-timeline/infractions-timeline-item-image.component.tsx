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
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
    />
  )
}
