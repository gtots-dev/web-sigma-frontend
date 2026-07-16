'use client'

import { Maximize2, Minimize2 } from 'lucide-react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'

export function MonitoringControlsMaximizeToggle() {
  const { isMaximized, setIsMaximized } = useMonitoringContext()
  return (
    <Button
      size="icon"
      variant='outline'
      onClick={() => setIsMaximized(!isMaximized)}
      title={isMaximized ? 'Sair da Tela Cheia' : 'Entrar em Tela Cheia'}
      className={isMaximized
        ? 'bg-primary-500 text-white hover:bg-primary-500/90'
        : 'bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground'
      }
    >
      {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
    </Button>
  )
}
