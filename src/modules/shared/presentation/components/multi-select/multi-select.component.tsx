'use client'

import { useRef, useState, useEffect } from 'react'
import { Check, ChevronsUpDown, Square, X } from 'lucide-react'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/modules/shared/presentation/components/shadcn/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/modules/shared/presentation/components/shadcn/tooltip'
import { cn } from '@/modules/shared/presentation/lib/utils'
import {
  useMultiSelect,
  MultiSelectItem
} from '@/modules/shared/presentation/hooks/use-multi-select.hook'
import { Input } from '../shadcn/input'

interface Props<T extends MultiSelectItem> {
  items: T[]
  className?: string
  value: (string | number)[]
  onChange: (value: (string | number)[]) => void
  placeholder?: string
  notFoundItemPlaceholder?: string
  minSelected?: number
  dotColor?: string | ((item: T) => string)
}

export function MultiSelect<T extends MultiSelectItem>({
  items,
  value,
  onChange,
  className,
  placeholder = 'Selecionar',
  notFoundItemPlaceholder = 'Nenhum item encontrado',
  minSelected,
  dotColor
}: Props<T>) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [triggerWidth, setTriggerWidth] = useState(0)

  const {
    search,
    setSearch,
    filteredItems,
    toggle,
    selectAll,
    clearAll,
    clearSearch,
    selectedItems,
    label
  } = useMultiSelect({
    items,
    selected: value,
    onChange
  })

  useEffect(() => {
    if (triggerRef.current) setTriggerWidth(triggerRef.current.offsetWidth)
  }, [items])

  const handleToggle = (id: string | number) => {
    const isSelected = value.includes(id)
    if (isSelected && minSelected && value.length <= minSelected) return
    toggle(id)
  }

  const getDotColor = (item: T) => {
    if (!dotColor) return null
    return typeof dotColor === 'function' ? dotColor(item) : dotColor
  }

  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              ref={triggerRef}
              variant="outline"
              role="combobox"
              className={cn(
                'w-full justify-between truncate',
                value.length === 0 && 'text-muted-foreground',
                className
              )}
            >
              <span className="truncate">{label ?? placeholder}</span>

              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>

        {value.length > 2 && (
          <TooltipContent
            align="start"
            className="bg-white dark:bg-black border"
          >
            <ul className="flex flex-col gap-1 text-sm">
              {selectedItems.map((i) => (
                <li key={i.id} className="flex items-center gap-2">
                  <Check className="h-3 w-3" />
                  {i.label}
                </li>
              ))}
            </ul>
          </TooltipContent>
        )}
      </Tooltip>

      <PopoverContent
        align="start"
        className="p-2 flex flex-col gap-y-2"
        style={{ minWidth: triggerWidth }}
      >
        <div className="relative flex">
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border px-2 py-1 !pe-10 text-sm outline-none"
          />

          {search && (
            <Button
              size="icon"
              variant="ghost"
              onClick={clearSearch}
              className="absolute -translate-y-2/4 top-2/4 right-1 !bg-transparent"
            >
              <X className="stroke-destructive" />
            </Button>
          )}
        </div>

        {filteredItems.length > 0 && (
          <div className="flex gap-3">
            {selectedItems.length === filteredItems.length ? (
              <Button
                size="sm"
                variant="ghost"
                className="underline underline-offset-4 px-2"
                onClick={clearAll}
                disabled={
                  minSelected !== undefined &&
                  selectedItems.length <= minSelected
                }
              >
                Limpar seleção
              </Button>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                className="underline underline-offset-4 px-2"
                onClick={selectAll}
              >
                Selecionar todos
              </Button>
            )}
          </div>
        )}

        <div className="flex flex-col gap-y-1 max-h-64 overflow-y-auto">
          {filteredItems.length === 0 ? (
            <div className="p-2 text-sm text-muted-foreground">
              {notFoundItemPlaceholder}
            </div>
          ) : (
            filteredItems.map((item) => {
              const isSelected = value.includes(item.id)
              const dot = getDotColor(item)

              return (
                <div
                  key={item.id}
                  className={cn(
                    'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent/35',
                    isSelected && 'bg-accent/35'
                  )}
                  onClick={() => handleToggle(item.id)}
                >
                  {isSelected ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Square className="h-4 w-4" strokeWidth={1} />
                  )}

                  <span className="truncate">{item.label}</span>

                  {dot && (
                    <span
                      className="h-2.5 w-2.5 ms-auto rounded-full"
                      style={{ backgroundColor: dot }}
                    />
                  )}
                </div>
              )
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
