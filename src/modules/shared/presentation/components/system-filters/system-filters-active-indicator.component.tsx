'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/modules/shared/presentation/components/shadcn/tooltip'
import {
  useSystemFiltersActiveIndicator,
  type UseSystemFiltersActiveIndicatorProps
} from '../../hooks/use-system-filters-active-indicator.hook'

export type SystemFiltersActiveIndicatorProps<T extends object = object> =
  UseSystemFiltersActiveIndicatorProps<T>

export function SystemFiltersActiveIndicatorComponent<T extends object = object>({
  labels,
  values: externalValues,
  valueResolver
}: SystemFiltersActiveIndicatorProps<T>) {
  const { activeItems, count } = useSystemFiltersActiveIndicator({
    labels,
    values: externalValues,
    valueResolver
  })

  if (count === 0) return null

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[11px] font-medium transition-all group-data-[state=open]:hidden select-none cursor-pointer">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>
              {count} {count === 1 ? 'filtro ativo' : 'filtros ativos'}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="p-2.5 max-w-xs space-y-1.5 bg-popover text-popover-foreground border border-border shadow-md"
        >
          <p className="font-semibold text-muted-foreground text-[10px] uppercase tracking-wider">
            Filtros Aplicados
          </p>
          <ul className="space-y-1 text-xs">
            {activeItems.map((item) => (
              <li key={item.key} className="flex justify-between gap-3">
                <span className="text-muted-foreground">{item.label}:</span>
                <span className="font-medium truncate max-w-[160px]">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
