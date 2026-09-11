'use client'

import { Play, Pause } from 'lucide-react'

interface InfractionImageViewerBadgeProps {
  currentIndex?: number
  totalCount?: number
  isLive?: boolean
  onToggleLive?: () => void
}

export function InfractionImageViewerBadge({
  currentIndex,
  totalCount,
  isLive = true,
  onToggleLive
}: InfractionImageViewerBadgeProps) {
  if (typeof currentIndex !== 'number' || typeof totalCount !== 'number') {
    return null
  }

  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/85 text-white backdrop-blur-md border border-white/10 text-[11px] font-mono font-medium z-20">
      {onToggleLive && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggleLive?.()
          }}
          className="flex items-center gap-1.5 hover:text-primary-500 transition-colors cursor-pointer pr-2 border-r border-white/20"
          title={
            isLive ? 'Pausar transmissão (Espaço)' : 'Retomar ao vivo (Espaço)'
          }
        >
          {isLive ? (
            <Pause className="w-3 h-3 fill-current text-amber-400" />
          ) : (
            <Play className="w-3 h-3 fill-current text-primary-500" />
          )}
          <span className="text-[10px] font-bold tracking-wider">
            {isLive ? 'AO VIVO' : 'PAUSADO'}
          </span>
        </button>
      )}

      <span>
        {currentIndex + 1} de {totalCount}
      </span>
    </div>
  )
}
