import { ImageOff } from 'lucide-react'

export function InfractionViewerEmpty() {
  return (
    <div className="flex flex-col items-center gap-2 text-muted-foreground">
      <ImageOff className="w-10 h-10 opacity-30" strokeWidth={1.5} />
      <span className="text-xs font-medium">Sem imagem disponível</span>
    </div>
  )
}

