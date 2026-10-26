'use client'

import { EyeOff } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/modules/shared/presentation/components/shadcn/tooltip'

export function MonitoringStatusIgnoreBadge() {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="inline-flex items-center justify-center h-5 w-5 rounded border border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0 cursor-help"
            aria-label="Status ignorado na seção de Status"
          >
            <EyeOff className="h-3 w-3" />
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          sideOffset={6}
          className="z-[200] bg-zinc-900 text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 border border-zinc-800 dark:border-zinc-700 shadow-md px-2.5 py-1 rounded-md text-xs font-medium"
        >
          Status ignorado
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
