'use client'

import { useFormContext } from 'react-hook-form'
import { Clock } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem
} from '@/modules/shared/presentation/components/shadcn/form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/modules/shared/presentation/components/shadcn/popover'
import {
  normalizeInputValue,
  toInputHHMM
} from '@/modules/shared/presentation/utils/formatted.utils'
import type { InfractionsFiltersSchemaType } from '@/modules/infractions/presentation/hooks/use-infractions-filters-schema.hook'

export function InfractionsFormInputTimeComponent() {
  const { control } = useFormContext<InfractionsFiltersSchemaType>()

  const renderTimePopover = (
    label: 'Hora Início' | 'Hora Fim',
    value: string,
    onChange: (v: string) => void
  ) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-9 gap-1.5 px-2 sm:px-3 bg-muted/20 border-border/50 hover:bg-muted/40 transition-all w-full justify-between shadow-none text-xs font-semibold py-2.5 dark:text-zinc-50 min-w-0 flex-1"
        >
          <div className="flex items-center gap-1.5 overflow-hidden w-full min-w-0">
            <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <div className="flex items-center gap-1.5 border-l border-border/50 pl-1.5 overflow-hidden min-w-0 flex-1">
              <span className="truncate text-xs font-semibold">{value || label}</span>
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" sideOffset={10}>
        <input
          type="time"
          className="border rounded px-2 py-1 text-sm dark:bg-zinc-900 dark:text-zinc-50"
          value={toInputHHMM(value)}
          onChange={(e) => onChange(normalizeInputValue(e.target.value))}
        />
      </PopoverContent>
    </Popover>
  )

  return (
    <FormField
      control={control}
      name="time_range"
      render={({ field }) => {
        const start = field.value?.start
        const end = field.value?.end

        return (
          <FormItem className="flex flex-col w-full">
            <FormControl>
              <div className="flex gap-2 w-full">
                {renderTimePopover('Hora Início', start ?? '', (newValue) =>
                  field.onChange({ ...field.value, start: newValue })
                )}
                {renderTimePopover('Hora Fim', end ?? '', (newValue) =>
                  field.onChange({ ...field.value, end: newValue })
                )}
              </div>
            </FormControl>
          </FormItem>
        )
      }}
    />
  )
}
