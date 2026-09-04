import { Play, Pause } from 'lucide-react'

interface InfractionsSidebarHeaderProps {
  count: number
  isLive?: boolean
  onToggleLive?: () => void
  title?: string
}

export function InfractionsSidebarHeader({
  count,
  isLive = false,
  onToggleLive,
  title
}: InfractionsSidebarHeaderProps) {
  const showLiveControls = typeof onToggleLive === 'function'

  return (
    <div className="px-3 py-2.5 border-b shrink-0 flex items-center justify-between bg-card/80 backdrop-blur-xs">
      <div className="flex items-center gap-2">
        {showLiveControls && (
          <span className="flex h-2 w-2 relative shrink-0">
            {isLive ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </>
            ) : (
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            )}
          </span>
        )}
        <div className="flex flex-col">
          <span className="text-[11px] font-bold uppercase tracking-wider text-foreground">
            {title ?? (showLiveControls ? (isLive ? 'Ao Vivo' : 'Pausado') : 'Registros')}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {showLiveControls && onToggleLive && (
          <button
            onClick={onToggleLive}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer border ${
              isLive
                ? 'bg-amber-500/15 text-amber-500 border-amber-500/30 hover:bg-amber-500/25'
                : 'bg-primary-500 text-white border-primary-500 hover:bg-primary-500/90 shadow-xs'
            }`}
            title={
              isLive
                ? 'Pausar transmissão (Espaço)'
                : 'Retomar transmissão ao vivo (Espaço)'
            }
          >
            {isLive ? (
              <>
                <Pause className="w-3 h-3 fill-current" />
                Pausar
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                Ao Vivo
              </>
            )}
          </button>
        )}

        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary-500/15 text-primary-500 border border-primary-500/30">
          {count}
        </span>
      </div>
    </div>
  )
}
