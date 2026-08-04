'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { BarChart3 } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import type { TrafficFlowSchemaType } from '@/modules/traffic-flow/presentation/hooks/use-traffic-flow-schema.hook'
import { SingleSelect } from '@/modules/shared/presentation/components/single-select/single-select.component'
import type { TrafficFlowGranularityInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow-granularity.interface'

const GRANULARITY_LABELS: Record<TrafficFlowGranularityInterface, string> = {
  day: 'Dia',
  hour: 'Hora',
  month: 'Mês',
  year: 'Ano'
}

export function TrafficFlowGranularityComponent() {
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
        <FormItem className="flex flex-col w-full">
          <FormControl>
            <SingleSelect
              items={granularityItems}
              value={field.value ?? ''}
              leftIcon={BarChart3}
              onChange={(value) => {
                if (!value) return
                if (value === field.value) return
                field.onChange(value)
              }}
              placeholder="Granularidade"
              notFoundItemPlaceholder="Nenhuma granularidade encontrada"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
