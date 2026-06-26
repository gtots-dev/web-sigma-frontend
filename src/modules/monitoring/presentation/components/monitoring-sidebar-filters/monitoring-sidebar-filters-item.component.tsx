'use client'

import { Check, HardDrive, ArrowUpDown } from 'lucide-react'

interface MonitoringSidebarFiltersItemProps {
  name: string
  count: number
  type: 'up' | 'lane'
  isSelected: boolean
  onToggle: () => void
}

export function MonitoringSidebarFiltersItem({
  name,
  count,
  type,
  isSelected,
  onToggle
}: MonitoringSidebarFiltersItemProps) {
  return (
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-3 rounded-md py-1.5 px-2 text-left text-xs transition-all duration-200 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border border-transparent"
    >
      <div className="flex items-center gap-2 overflow-hidden">
        {/* Custom Checkbox - Standard size (h-4 w-4) */}
        <div
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all duration-200 ${
            isSelected
              ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950'
              : 'border-zinc-300 dark:border-zinc-700 bg-transparent'
          }`}
        >
          {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
        </div>

        <span className="truncate font-medium">{name}</span>
      </div>

      <div className="flex justify-between items-center gap-5">
        {type === 'up' ? (
          <HardDrive size={14} className="text-muted-foreground shrink-0" />
        ) : (
          <ArrowUpDown size={14} className="text-muted-foreground shrink-0" />
        )}
        <span className="shrink-0 rounded-md font-mono text-[10px] px-1.5 py-0.5 border bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
          {count}
        </span>
      </div>
    </button>
  )
}
