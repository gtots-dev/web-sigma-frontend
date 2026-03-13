'use client'

import { useFormContext } from 'react-hook-form'
import { Clock } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/modules/shared/presentation/components/shadcn/form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/modules/shared/presentation/components/shadcn/popover'
import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'
import {
  normalizeInputValue,
  toInputHHMM
} from '@/modules/shared/presentation/utils/formatted.utils'
import type { TrafficFlowSchemaType } from '../../hooks/use-traffic-flow-schema.hook'

export function TrafficFlowTimeRangeComponent({
  require,
  description
}: {
  require?: boolean
  description?: string
}) {
  const { control } = useFormContext<TrafficFlowSchemaType>()

  const renderTimePopover = (
    label: 'Início' | 'Fim',
    value: string,
    onChange: (v: string) => void
  ) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between text-left font-normal dark:text-zinc-50 dark:border-zinc-800"
        >
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {value || label}
          </span>
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
          <FormItem className="flex flex-col">
            <FormLabel className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50">
              Intervalo de horas{require ? ': *' : ':'}
              <HelpMeButtonComponent description={description} />
            </FormLabel>

            <FormControl>
              <div className="flex gap-2">
                {renderTimePopover('Início', start, (newValue) =>
                  field.onChange({ ...field.value, start: newValue })
                )}
                {renderTimePopover('Fim', end, (newValue) =>
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
