import { WifiOff } from 'lucide-react'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'

interface MonitoringErrorProps {
  onReconnect: () => void
}

export function MonitoringError({ onReconnect }: MonitoringErrorProps) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-background/60 backdrop-blur-md z-50 transition-all duration-300"
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
    >
      {/* Container de Alerta Pulsante Vermelho Premium */}
      <div className="relative flex items-center justify-center w-20 h-20">
        {/* Glow externo de erro */}
        <div className="absolute inset-0 rounded-full border border-destructive/10 animate-ping [animation-duration:2s]" />
        <div className="absolute w-14 h-14 rounded-full border border-destructive/20 animate-pulse duration-1000" />
        
        {/* Icone central de rede offline */}
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-background border border-destructive/20 shadow-md">
          <WifiOff className="h-4.5 w-4.5 text-destructive" />
        </div>
      </div>

      {/* Detalhes do Erro */}
      <div className="flex flex-col items-center gap-1.5 text-center px-6 max-w-sm">
        <span className="text-[10px] uppercase font-bold tracking-widest text-destructive/85">
          Sem Conexão
        </span>
        <p className="text-sm font-semibold text-muted-foreground">
          Falha ao estabelecer conexão em tempo real com os equipamentos.
          O servidor pode estar temporariamente indisponível.
        </p>
      </div>

      {/* Botão de Reconectar */}
      <Button
        variant="outline"
        onClick={onReconnect}
        className="mt-2 font-semibold shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
      >
        Tentar Novamente
      </Button>
    </div>
  )
}
