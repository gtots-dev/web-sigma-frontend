interface InfractionsTimelineItemImageProps {
  src: string
  alt?: string
}

export function InfractionsTimelineItemImage({
  src,
  alt = 'Registro'
}: InfractionsTimelineItemImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
    />
  )
}
