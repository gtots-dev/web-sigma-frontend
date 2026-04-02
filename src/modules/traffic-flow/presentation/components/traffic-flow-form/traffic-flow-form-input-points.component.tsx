'use client'

import { useMemo, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'
import { useParams } from 'next/navigation'
import { usePointStore } from '@/modules/points/presentation/stores/point.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { TrafficFlowSchemaType } from '@/modules/traffic-flow/presentation/hooks/use-traffic-flow-schema.hook'
import { MultiSelect } from '@/modules/shared/presentation/components/multi-select/multi-select.component'

interface TrafficFlowPointsComponentProps {
  require?: boolean
  description?: string
}

export function TrafficFlowPointsComponent({
  require,
  description
}: TrafficFlowPointsComponentProps) {
  const { control } = useFormContext<TrafficFlowSchemaType>()
  const { operationId, contractId }: UrlParams = useParams()
  const { points, getPoints } = usePointStore()

  useEffect(() => {
    if (operationId) {
      getPoints({ operationId, contractId })
    }
  }, [operationId, getPoints])

  const pointsItems = useMemo(() => {
    return points.map(({ point }) => ({
      id: point.id,
      label: point.name
    }))
  }, [points])

  return (
    <FormField
      control={control}
      name="places.point_ids"
      render={({ field }) => (
        <FormItem className="flex flex-col w-full lg:w-auto">
          <FormLabel className="flex items-center gap-x-1.5 text-sm dark:text-zinc-50">
            Pontos{require ? ': *' : ':'}
            <HelpMeButtonComponent description={description} />
          </FormLabel>

          <FormControl>
            <MultiSelect
              items={pointsItems}
              value={field.value ?? []}
              className="w-full md:min-w-[190px]"
              onChange={(value) => field.onChange(value.map(Number))}
              placeholder="Selecionar pontos"
              notFoundItemPlaceholder="Nenhum ponto encontrado"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
