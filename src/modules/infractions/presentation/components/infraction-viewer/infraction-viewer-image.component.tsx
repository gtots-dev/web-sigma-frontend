'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

interface InfractionViewerImageProps {
  src: string | null
  children?: ReactNode
  onClick?: () => void
}

export function InfractionViewerImage({
  src,
  children,
  onClick
}: InfractionViewerImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    setImageLoaded(false)
  }, [src])

  return (
    <div
      onClick={onClick}
      className={`relative flex-1 min-h-0 flex items-center justify-center p-3 overflow-hidden ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {src ? (
        <>
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted/20 backdrop-blur-[2px] flex items-center justify-center rounded-lg z-10">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}
          <img
            key={src}
            src={src}
            alt="Registro da infração"
            onLoad={() => setImageLoaded(true)}
            className={`w-full max-h-full object-contain rounded-lg transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      ) : (
        children
      )}
    </div>
  )
}
