import type { ReactNode } from 'react'

interface InfractionViewerImageProps {
  src: string | null
  children?: ReactNode
}

export function InfractionViewerImage({
  src,
  children
}: InfractionViewerImageProps) {
  return (
    <div className="flex-1 min-h-0 flex items-center justify-center p-3 overflow-hidden">
      {src ? (
        <img
          key={src}
          src={src}
          alt="Registro da infração"
          className="w-full max-h-full object-contain rounded-lg"
        />
      ) : (
        children
      )}
    </div>
  )
}
