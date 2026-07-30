'use client'

import { SystemFilters } from '@/modules/shared/presentation/components/system-filters'
import { ChevronDown } from 'lucide-react'

const INFRACTIONS_FILTER_LABELS: Record<string, string> = {
  plate: 'Placa',
  upId: 'UP',
  laneId: 'Faixa',
  startDate: 'Data Inicial',
  endDate: 'Data Final',
  status: 'Status'
}

export function InfractionsFiltersHeaderToggleComponent() {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <SystemFilters.ActiveIndicator labels={INFRACTIONS_FILTER_LABELS} />
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
