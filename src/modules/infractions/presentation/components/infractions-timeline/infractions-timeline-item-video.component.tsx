import { Play } from 'lucide-react'

interface InfractionsTimelineItemVideoProps {
  src?: string | null
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

export function InfractionsTimelineItemVideo({
  src
}: InfractionsTimelineItemVideoProps) {
  const isVideoSrc = isVideoFile(src)

  return (
    <div className="w-full h-full relative bg-muted flex items-center justify-center overflow-hidden">
      {src && (
        isVideoSrc ? (
          <video
            src={src}
            preload="metadata"
            muted
            playsInline
            className="w-full h-full object-cover opacity-80 pointer-events-none"
          />
        ) : (
          <img
            src={src}
            alt="Vídeo"
            className="w-full h-full object-cover opacity-80"
          />
        )
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
        <div className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center border border-white/20">
          <Play className="w-3 h-3 fill-current ml-0.5" />
        </div>
      </div>
    </div>
  )
}
