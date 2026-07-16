'use client'

import { useRef, useState, useEffect } from 'react'
import { Check, ChevronsUpDown, Circle, X } from 'lucide-react'
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
  useSingleSelect,
  SingleSelectItem
} from '@/modules/shared/presentation/hooks/use-single-select.hook'
import { Input } from '../shadcn/input'

interface Props<T extends SingleSelectItem> {
  items: T[]
  value?: string | number
  onChange: (value?: string | number) => void
  placeholder?: string
  notFoundItemPlaceholder?: string
  className?: string
  dotColor?: string | ((item: T) => string)
  leftIcon?: React.ComponentType<{ className?: string; size?: number }>
  innerIcon?: React.ComponentType<{ className?: string; size?: number }>
  innerIconColor?: string
  textUppercase?: boolean
  popoverAlign?: 'start' | 'center' | 'end'
  popoverWidth?: number
  popoverClassName?: string
  searchable?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SingleSelect<T extends SingleSelectItem>({
  items,
  value,
  onChange,
  placeholder = 'Selecionar',
  notFoundItemPlaceholder = 'Nenhum item encontrado',
  className,
  dotColor,
  leftIcon: LeftIcon,
  innerIcon: InnerIcon,
  innerIconColor,
  textUppercase,
  popoverAlign = 'start',
  popoverWidth,
  popoverClassName,
  searchable = true,
  onOpenChange
}: Props<T>) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [triggerWidth, setTriggerWidth] = useState(0)
  const [open, setOpen] = useState(false)

  const {
    search,
    setSearch,
    filteredItems,
    select,
    clearSearch,
    selectedItem,
    label
  } = useSingleSelect({
    items,
    selected: value,
    onChange
  })

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth)
    }
  }, [items, open])

  const getDotColor = (item: T) => {
    if (!dotColor) return null
    return typeof dotColor === 'function' ? dotColor(item) : dotColor
  }

  return (
    <Popover open={open} onOpenChange={(v) => {
      setOpen(v)
      onOpenChange?.(v)
    }}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              ref={triggerRef}
              variant="outline"
              role="combobox"
              className={cn(
                'w-full justify-between truncate',
                !value && 'text-muted-foreground',
                LeftIcon &&
                  'h-9 gap-2 px-3 bg-muted/20 border-border/50 hover:bg-muted/40 transition-all w-full justify-between shadow-none text-xs font-semibold py-2.5',
                className
              )}
            >
              {LeftIcon ? (
                <div className="flex items-center gap-2 overflow-hidden w-full">
                  <LeftIcon
                    size={14}
                    className="text-muted-foreground shrink-0"
                  />
                  <div className="flex items-center gap-2 border-l border-border/50 pl-2 overflow-hidden">
                    {InnerIcon && (
                      <InnerIcon
                        size={14}
                        className={cn(
                          innerIconColor || 'text-muted-foreground',
                          'shrink-0'
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        'truncate overflow-hidden',
                        textUppercase
                          ? 'text-[10px] font-bold uppercase tracking-wider'
                          : 'text-xs font-semibold'
                      )}
                    >
                      {label ?? placeholder}
                    </span>
                  </div>
                </div>
              ) : (
                <span className="truncate overflow-hidden">
                  {label ?? placeholder}
                </span>
              )}

              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>

        {selectedItem && (
          <TooltipContent
            align="start"
            className="bg-white dark:bg-black border"
          >
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-3 w-3" />
              {selectedItem.label}
            </div>
          </TooltipContent>
        )}
      </Tooltip>

      <PopoverContent
        align={popoverAlign}
        className={cn("p-2 flex flex-col gap-y-2", popoverClassName)}
        style={{ width: popoverWidth ?? (triggerWidth || undefined) }}
      >
        {/* SEARCH */}
        {searchable && (
          <div className="relative flex">
            <Input
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full !pe-10"
            />

            {search && (
              <Button
                size="icon"
                variant="ghost"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                <X className="stroke-destructive" />
              </Button>
            )}
          </div>
        )}

        {/* LIST */}
        <div className="flex flex-col gap-y-1 max-h-64 overflow-y-auto">
          {filteredItems.length === 0 ? (
            <div className="p-2 text-sm text-muted-foreground">
              {notFoundItemPlaceholder}
            </div>
          ) : (
            filteredItems.map((item) => {
              const isSelected = value === item.id
              const dot = getDotColor(item)

              return (
                <div
                  key={item.id}
                  className={cn(
                    'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-accent',
                    isSelected && 'bg-accent'
                  )}
                  onClick={() => select(item.id)}
                >
                  {isSelected ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Circle className="h-4 w-4 opacity-50" />
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
