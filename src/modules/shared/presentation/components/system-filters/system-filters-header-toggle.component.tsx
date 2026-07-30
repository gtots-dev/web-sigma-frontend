'use client'

import { ChevronDown } from 'lucide-react'
import { SystemFiltersActiveIndicatorComponent } from './system-filters-active-indicator.component'

export interface SystemFiltersHeaderToggleProps<T extends object = object> {
  labels?: Record<string, string>
  values?: T
  valueResolver?: (key: string, value: unknown) => string | undefined | null
}

export function SystemFiltersHeaderToggleComponent<T extends object = object>({
  labels,
  values,
  valueResolver
}: SystemFiltersHeaderToggleProps<T>) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <SystemFiltersActiveIndicatorComponent
        labels={labels}
        values={values}
        valueResolver={valueResolver}
      />
      <div className="flex items-center gap-1 text-[11px] sm:text-xs font-medium text-muted-foreground hover:text-foreground px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md hover:bg-muted/60 transition-all">
        <span className="group-data-[state=open]:hidden hidden sm:inline">
          Expandir
        </span>
        <span className="hidden group-data-[state=open]:sm:inline">
          Ocultar
        </span>
        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </div>
    </div>
  )
}
