interface InfractionsSidebarItemThumbnailProps {
  src: string | null
  plate: string
}

export function InfractionsSidebarItemThumbnail({
  src,
  plate,
}: InfractionsSidebarItemThumbnailProps) {
  return (
    <div className="w-full aspect-video rounded bg-muted/30 border overflow-hidden flex items-center justify-center">
      {src ? (
        <img
          src={src}
          alt={`Infração ${plate}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <span className="text-[8px] text-muted-foreground font-mono">
          Sem imagem
        </span>
      )}
    </div>
  )
}
