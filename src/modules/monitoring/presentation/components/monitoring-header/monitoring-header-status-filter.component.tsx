'use client'

import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  LayoutGrid,
  ChevronDown,
  Filter
} from 'lucide-react'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { MonitoringStatus } from '../../../domain/interfaces/monitoring-cell.interface'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/modules/shared/presentation/components/shadcn/dropdown-menu'

export function MonitoringHeaderFilter() {
  const { statusFilter, setStatusFilter } = useMonitoringContext()

  const filters = [
    {
      id: 'all',
      label: 'Todas as Células',
      icon: LayoutGrid,
      color: 'text-foreground'
    },
    {
      id: 'ok',
      label: 'Normal',
      icon: CheckCircle2,
      color: 'text-[rgb(var(--monitoring-ok))]'
    },
    {
      id: 'warning',
      label: 'Atenção',
      icon: AlertCircle,
      color: 'text-[rgb(var(--monitoring-warning))]'
    },
    {
      id: 'error',
      label: 'Crítico',
      icon: XCircle,
      color: 'text-[rgb(var(--monitoring-error))]'
    }
  ]

  const activeFilter = filters.find((f) => f.id === statusFilter) || filters[0]
  const ActiveIcon = activeFilter.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-2 px-3 bg-muted/20 border-border/50 hover:bg-muted/40 transition-all w-full 2xl:w-auto 2xl:max-w-48 justify-between shadow-none"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <Filter size={14} className="text-muted-foreground shrink-0" />
            <div className="flex items-center gap-2 border-l border-border/50 pl-2 overflow-hidden">
              <ActiveIcon
                size={14}
                className={activeFilter.color + ' shrink-0'}
              />
              <span className="text-[10px] font-bold uppercase tracking-wider truncate">
                {activeFilter.label}
              </span>
            </div>
          </div>
          <ChevronDown
            size={14}
            className="text-muted-foreground opacity-50 shrink-0"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[var(--radix-dropdown-menu-trigger-width)]"
      >
        <DropdownMenuRadioGroup
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as MonitoringStatus | 'all')}
        >
          {filters.map((filter) => {
            const Icon = filter.icon
            const isActive = statusFilter === filter.id
            return (
              <DropdownMenuRadioItem
                key={filter.id}
                value={filter.id}
                className={`flex items-center gap-2 text-xs font-semibold py-2.5 cursor-pointer pl-3 transition-colors rounded-md
                  data-[state=checked]:bg-primary-500 data-[state=checked]:text-white [&>span]:hidden`}
              >
                <Icon
                  size={14}
                  className={isActive ? 'text-white' : filter.color}
                />
                {filter.label}
              </DropdownMenuRadioItem>
            )
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
