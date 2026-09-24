'use client'

import { Maximize2, Minimize2 } from 'lucide-react'
import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/modules/shared/presentation/components/shadcn/tooltip'

export function MonitoringControlsMaximizeToggle() {
  const { isMaximized, setIsMaximized } = useMonitoringContext()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant={isMaximized ? 'primary' : 'outline'}
          onClick={() => setIsMaximized(!isMaximized)}
          className={`h-10 w-10 sm:h-9 sm:w-9 rounded-xl sm:rounded-lg transition-all duration-200 active:scale-95 ${
            isMaximized
              ? 'bg-primary-600 text-white shadow-sm hover:bg-primary-600/90'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {isMaximized ? (
            <Minimize2 className="w-5 h-5 sm:w-4 sm:h-4 shrink-0" />
          ) : (
            <Maximize2 className="w-5 h-5 sm:w-4 sm:h-4 shrink-0" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs font-medium">
        {isMaximized ? 'Sair da Tela Cheia' : 'Entrar em Tela Cheia (F11)'}
      </TooltipContent>
    </Tooltip>
  )
}
