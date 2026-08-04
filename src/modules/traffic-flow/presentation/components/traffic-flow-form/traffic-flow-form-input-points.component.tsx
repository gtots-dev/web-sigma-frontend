'use client'

import { useMemo, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { MapPin } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { useParams } from 'next/navigation'
import { usePointStore } from '@/modules/points/presentation/stores/point.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { TrafficFlowSchemaType } from '@/modules/traffic-flow/presentation/hooks/use-traffic-flow-schema.hook'
import { MultiSelect } from '@/modules/shared/presentation/components/multi-select/multi-select.component'

export function TrafficFlowPointsComponent() {
  const { control } = useFormContext<TrafficFlowSchemaType>()
  const { operationId, contractId }: UrlParams = useParams()
  const { points, getPoints } = usePointStore()

  useEffect(() => {
    if (operationId && points.length === 0) {
      getPoints({ operationId, contractId })
    }
  }, [operationId, contractId, points.length, getPoints])

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
        <FormItem className="flex flex-col w-full">
          <FormControl>
            <MultiSelect
              items={pointsItems}
              value={field.value ?? []}
              leftIcon={MapPin}
              onChange={(value) => field.onChange(value.map(Number))}
              placeholder="Pontos"
              notFoundItemPlaceholder="Nenhum ponto encontrado"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
