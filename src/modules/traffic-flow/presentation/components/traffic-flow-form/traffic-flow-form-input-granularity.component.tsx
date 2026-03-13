'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'
import type { TrafficFlowSchemaType } from '@/modules/traffic-flow/presentation/hooks/use-traffic-flow-schema.hook'
import { SingleSelect } from '@/modules/shared/presentation/components/single-select/single-select.component'
import type { TrafficFlowGranularityInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow-granularity.interface'

interface TrafficFlowGranularityComponentProps {
  require?: boolean
  description?: string
}

const GRANULARITY_LABELS: Record<TrafficFlowGranularityInterface, string> = {
  day: 'Dia',
  hour: 'Hora',
  month: 'Mês',
  year: 'Ano'
}

export function TrafficFlowGranularityComponent({
  require,
  description
}: TrafficFlowGranularityComponentProps) {
  const { control } = useFormContext<TrafficFlowSchemaType>()

  const granularities: TrafficFlowGranularityInterface[] = [
    'day',
    'hour',
    'month',
    'year'
  ]

  const granularityItems = useMemo(
    () =>
      granularities.map((granularity) => ({
        id: granularity,
        label: GRANULARITY_LABELS[granularity]
      })),
    []
  )

  return (
    <FormField
      control={control}
      name="granularity"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="flex items-center gap-x-1.5 text-sm dark:text-zinc-50">
            Granularidade{require ? ': *' : ':'}
            <HelpMeButtonComponent description={description} />
          </FormLabel>

          <FormControl>
            <SingleSelect
              items={granularityItems}
              value={field.value ?? ''}
              onChange={(value) => {
                if (!value) return
                if (value === field.value) return
                field.onChange(value)
              }}
              placeholder="Selecionar granularidade"
              notFoundItemPlaceholder="Nenhuma granularidade encontrada"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
