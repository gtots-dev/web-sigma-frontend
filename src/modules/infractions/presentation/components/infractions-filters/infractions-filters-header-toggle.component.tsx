'use client'

import { ChevronDown } from 'lucide-react'

export function InfractionsFiltersHeaderToggleComponent() {
  return (
    <div className="flex items-center gap-1 text-[11px] sm:text-xs font-medium text-muted-foreground hover:text-foreground px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md hover:bg-muted/60 transition-all shrink-0">
      <span className="group-data-[state=open]:hidden hidden sm:inline">Expandir</span>
      <span className="hidden group-data-[state=open]:sm:inline">Ocultar</span>
      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
    </div>
  )
}
