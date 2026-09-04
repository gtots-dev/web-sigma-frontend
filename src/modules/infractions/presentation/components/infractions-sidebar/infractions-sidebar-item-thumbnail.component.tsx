interface InfractionsSidebarItemThumbnailProps {
  src: string | null
  plate?: string
}

function isVideoFile(url?: string | null): boolean {
  if (!url) return false
  const lower = url.toLowerCase()
  return (
    lower.endsWith('.mp4') ||
    lower.endsWith('.webm') ||
    lower.endsWith('.mov') ||
    lower.endsWith('.m4v')
  )
}

export function InfractionsSidebarItemThumbnail({
  src
}: InfractionsSidebarItemThumbnailProps) {
  const isVideoSrc = isVideoFile(src)

  return (
    <div className="w-16 h-11 shrink-0 rounded-md bg-muted/40 border border-border/60 overflow-hidden flex items-center justify-center relative">
      {src ? (
        isVideoSrc ? (
          <video
            src={src}
            preload="metadata"
            muted
            playsInline
            className="w-full h-full object-cover pointer-events-none"
          />
        ) : (
          <img
            src={src}
            alt="Captura"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )
      ) : (
        <span className="text-[8px] text-muted-foreground font-mono">
          Sem Imagem
        </span>
      )}
    </div>
  )
}
