import type { ReactNode } from 'react'

interface InfractionViewerStripProps {
  children: ReactNode
  title?: string
  description?: string
}

export function InfractionViewerStrip({
  children,
  title = 'Mídias do Registro',
  description = 'Imagens e vídeos associados'
}: InfractionViewerStripProps) {
  return (
    <div className="shrink-0 bg-card border rounded-xl overflow-hidden w-full flex flex-col p-3 gap-2.5 max-h-[250px]">
      <div className="flex flex-col gap-0.5 min-w-0">
        <h4 className="text-xs font-semibold text-foreground tracking-tight truncate">
          {title}
        </h4>
        <p className="text-[11px] text-muted-foreground truncate">
          {description}
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  )
}

