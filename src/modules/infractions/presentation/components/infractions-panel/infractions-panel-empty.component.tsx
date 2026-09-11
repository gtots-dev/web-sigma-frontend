import { Radio, SearchX } from 'lucide-react'

interface InfractionsPanelEmptyProps {
  isLive?: boolean
}

export function InfractionsPanelEmpty({ isLive = false }: InfractionsPanelEmptyProps) {
  if (isLive) {
    return (
      <div className="flex flex-1 items-center justify-center text-muted-foreground bg-card border rounded-xl h-[calc(100vh-180px)] p-6">
        <div className="flex flex-col items-center gap-3 text-center max-w-sm">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/10 border border-primary-500/20">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500/20 opacity-75"></span>
            <Radio className="w-7 h-7 text-primary-500 relative z-10" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-foreground">
              Aguardando capturas de tráfego
            </span>
            <span className="text-xs text-muted-foreground">
              A transmissão ao vivo via WebSocket está ativa. Novas capturas aparecerão automaticamente nesta linha do tempo.
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 items-center justify-center text-muted-foreground bg-card border border-border/60 rounded-xl h-[calc(100vh-180px)] p-6">
      <div className="flex flex-col items-center gap-3 text-center max-w-sm">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-muted border border-border/60">
          <SearchX className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-foreground">
            Nenhum registro encontrado
          </span>
          <span className="text-xs text-muted-foreground">
            Nenhuma captura de tráfego foi encontrada para os filtros selecionados. Tente ajustar os parâmetros da busca.
          </span>
        </div>
      </div>
    </div>
  )
}
