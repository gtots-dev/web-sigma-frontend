'use client'

import { LoaderCircle, RefreshCw } from 'lucide-react'

interface MonitoringLoadingProps {
  isReconnecting?: boolean
}

export function MonitoringLoading({
  isReconnecting = false
}: MonitoringLoadingProps) {
  
  const stopPropagation = (e: React.SyntheticEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      onPointerDown={stopPropagation}
      onMouseDown={stopPropagation}
      onPointerMove={stopPropagation}
      onMouseMove={stopPropagation}
      onWheel={stopPropagation}
      onTouchStart={stopPropagation}
      onTouchMove={stopPropagation}
      className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-background/60 backdrop-blur-md z-50 transition-all duration-300 pointer-events-auto"
    >
      {/* Container de Anel de Radar Pulsante Premium */}
      <div className="relative flex items-center justify-center w-20 h-20">
        {/* Glows externos pulsando em delay */}
        <div className="absolute inset-0 rounded-full border border-primary/10 animate-ping [animation-duration:1.5s]" />
        <div className="absolute w-14 h-14 rounded-full border border-primary/20 animate-pulse duration-1000" />
        
        {/* Icone Loader Central com Sombra */}
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-background border shadow-md border-muted">
          {isReconnecting ? (
            <RefreshCw className="h-4.5 w-4.5 text-primary animate-spin [animation-duration:1.2s]" />
          ) : (
            <LoaderCircle className="h-5 w-5 text-primary animate-spin [animation-duration:1s]" />
          )}
        </div>
      </div>

      {/* Tipografia alinhada com Micro-Animação */}
      <div className="flex flex-col items-center gap-1.5 text-center px-4">
        <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80">
          {isReconnecting ? 'Sincronização' : 'Inicialização'}
        </span>
        <p className="text-sm font-semibold text-muted-foreground animate-pulse duration-1000">
          {isReconnecting
            ? 'Tentando reconectar aos equipamentos...'
            : 'Carregando estrutura dos equipamentos...'}
        </p>
      </div>
    </div>
  )
}
