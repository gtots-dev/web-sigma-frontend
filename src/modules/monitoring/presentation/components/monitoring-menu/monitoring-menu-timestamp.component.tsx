import React from 'react'

export function MonitoringMenuTimestamp() {
  return (
    <div className="px-4 py-2 bg-muted/30 flex items-center justify-between">
      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
        Última Atualização
      </span>
      <span className="text-[10px] font-mono text-primary animate-pulse">
        {new Date().toLocaleTimeString('pt-BR', { hour12: false })}
      </span>
    </div>
  )
}
