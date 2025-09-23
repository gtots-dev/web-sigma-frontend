'use client'

import { useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { CalendarIcon } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/modules/shared/presentation/components/shadcn/popover'
import { Calendar } from '@/modules/shared/presentation/components/shadcn/calendar'
import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'
import { ptBR } from 'date-fns/locale'
import type { ActivityReportSchemaType } from '@/modules/activity-report/presentation/hooks/use-activity-schema.hook'
import { startOfMonth, subMonths } from 'date-fns'
import {
  formatDateOnly,
  formatDatePTBR
} from '@/modules/shared/presentation/utils/formatted.utils'

export function ActivityReportDateRangeComponent({
  require,
  description
}: {
  require?: boolean
  description?: string
}) {
  const { control, setValue, watch } =
    useFormContext<ActivityReportSchemaType>()
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
        const start = field.value?.start
          ? new Date(field.value.start)
          : undefined
        const end = field.value?.end ? new Date(field.value.end) : undefined
        const selected =
          start && end
            ? { from: start, to: end }
            : start
              ? { from: start }
              : undefined

        return (
          <FormItem className="flex flex-col">
            <FormLabel className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50">
              Intervalo de datas{require ? ': *' : ':'}
              <HelpMeButtonComponent description={description} />
            </FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between text-left font-normal dark:text-zinc-50 dark:border-zinc-800"
                  >
                    <span className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {start && end ? (
                        <span>
                          {formatDatePTBR(start)} - {formatDatePTBR(end)}
                        </span>
                      ) : (
                        <span>Selecione intervalo</span>
                      )}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
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
