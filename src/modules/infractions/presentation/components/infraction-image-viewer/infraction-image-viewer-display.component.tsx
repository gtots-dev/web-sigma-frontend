'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

interface InfractionImageViewerDisplayProps {
  src: string | null
  alt?: string
  children?: ReactNode
}

export function InfractionImageViewerDisplay({
  src,
  alt = 'Registro da infração',
  children
}: InfractionImageViewerDisplayProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    setImageLoaded(false)
  }, [src])

  if (!src) {
    return <>{children}</>
  }

  return (
    <>
      {!imageLoaded && (
        <div className="absolute inset-0 bg-muted/20 backdrop-blur-[2px] flex items-center justify-center rounded-lg z-10">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      <img
        key={src}
        src={src}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        className={`w-full max-h-full object-contain rounded-lg transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  )
}
