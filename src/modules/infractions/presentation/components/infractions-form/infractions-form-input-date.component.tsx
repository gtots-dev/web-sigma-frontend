'use client'

import { useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { CalendarIcon } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/modules/shared/presentation/components/shadcn/popover'
import { Calendar } from '@/modules/shared/presentation/components/shadcn/calendar'
import { ptBR } from 'date-fns/locale'
import { startOfMonth, subMonths } from 'date-fns'
import {
  formatDateOnly,
  formatDatePTBR,
  parseDateOnly
} from '@/modules/shared/presentation/utils/formatted.utils'
import type { InfractionsFiltersSchemaType } from '@/modules/infractions/presentation/hooks/use-infractions-filters-schema.hook'

export function InfractionsFormInputDateComponent() {
  const { control, setValue, watch } =
    useFormContext<InfractionsFiltersSchemaType>()
  const today = useMemo(() => new Date(), [])
  const dateRange = watch('date_range')

  useEffect(() => {
    if (!dateRange?.start || !dateRange?.end) {
      const defaultFrom = subMonths(today, 1)
      const defaultTo = today

      setValue('date_range', {
        start: formatDateOnly(defaultFrom),
        end: formatDateOnly(defaultTo)
      })
    }
  }, [dateRange, setValue, today])

  return (
    <FormField
      control={control}
      name="date_range"
      render={({ field }) => {
        const start = parseDateOnly(field.value?.start)
        const end = parseDateOnly(field.value?.end)
        const selected =
          start && end
            ? { from: start, to: end }
            : start
              ? { from: start }
              : undefined

        return (
          <FormItem className="flex flex-col w-full">
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-9 gap-2 px-3 bg-muted/20 border-border/50 hover:bg-muted/40 transition-all w-full justify-between shadow-none text-xs font-semibold py-2.5 dark:text-zinc-50"
                  >
                    <div className="flex items-center gap-2 overflow-hidden w-full">
                      <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <div className="flex items-center gap-2 border-l border-border/50 pl-2 overflow-hidden">
                        {start && end ? (
                          <span className="truncate text-xs font-semibold">
                            {formatDatePTBR(start)} - {formatDatePTBR(end)}
                          </span>
                        ) : (
                          <span className="text-xs font-semibold text-muted-foreground">
                            Intervalo de datas
                          </span>
                        )}
                      </div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-auto overflow-hidden p-0"
                  sideOffset={10}
                >
                  <Calendar
                    locale={ptBR}
                    mode="range"
                    numberOfMonths={2}
                    selected={selected}
                    disabled={(date) => date > today}
                    endMonth={startOfMonth(today)}
                    onSelect={(range) => {
                      if (!range) return
                      const from =
                        range.from && range.from <= today
                          ? formatDateOnly(range.from)
                          : null
                      const to =
                        range.to && range.to <= today
                          ? formatDateOnly(range.to)
                          : null
                      field.onChange({ start: from, end: to })
                    }}
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
