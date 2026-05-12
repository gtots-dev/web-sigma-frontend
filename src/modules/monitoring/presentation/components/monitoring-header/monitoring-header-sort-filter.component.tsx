'use client'

import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import {
  ArrowUpNarrowWide,
  ArrowDownNarrowWide,
  ListOrdered,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/modules/shared/presentation/components/shadcn/dropdown-menu'

export function MonitoringHeaderSort() {
  const { sortMode, setSortMode } = useMonitoringContext()

  const sortOptions = [
    {
      id: 'none',
      label: 'Sem Ordenação',
      icon: ListOrdered,
      color: 'text-muted-foreground'
    },
    {
      id: 'highest',
      label: 'Maior Criticidade',
      icon: ArrowDownNarrowWide,
      color: 'text-[rgb(var(--monitoring-error))]'
    },
    {
      id: 'lowest',
      label: 'Maior Estabilidade',
      icon: ArrowUpNarrowWide,
      color: 'text-[rgb(var(--monitoring-ok))]'
    }
  ]

  const activeSort =
    sortOptions.find((o) => o.id === sortMode) || sortOptions[0]
  const ActiveIcon = activeSort.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-2 px-3 bg-muted/20 border-border/50 hover:bg-muted/40 transition-all w-full 2xl:w-auto 2xl:max-w-48 justify-between shadow-none"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <ListOrdered size={14} className="text-muted-foreground shrink-0" />
            <div className="flex items-center gap-2 border-l border-border/50 pl-2 overflow-hidden">
              <ActiveIcon
                size={14}
                className={activeSort.color + ' shrink-0'}
              />
              <span className="text-[10px] font-bold uppercase tracking-wider truncate">
                {activeSort.label}
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
          value={sortMode}
          onValueChange={(v) => setSortMode(v as 'none' | 'highest' | 'lowest')}
        >
          {sortOptions.map((option) => {
            const Icon = option.icon
            const isActive = sortMode === option.id
            return (
              <DropdownMenuRadioItem
                key={option.id}
                value={option.id}
                className={`flex items-center gap-2 text-xs font-semibold py-2.5 cursor-pointer pl-3 transition-colors
                  data-[state=checked]:bg-primary-500 data-[state=checked]:text-white [&>span]:hidden`}
              >
                <Icon
                  size={14}
                  className={isActive ? 'text-white' : option.color}
                />
                {option.label}
              </DropdownMenuRadioItem>
            )
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
