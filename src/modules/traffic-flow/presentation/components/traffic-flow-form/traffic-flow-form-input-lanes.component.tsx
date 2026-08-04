'use client'

import { useMemo, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { ArrowUpDown } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { useParams } from 'next/navigation'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { TrafficFlowSchemaType } from '@/modules/traffic-flow/presentation/hooks/use-traffic-flow-schema.hook'
import { MultiSelect } from '@/modules/shared/presentation/components/multi-select/multi-select.component'

export function TrafficFlowLanesComponent() {
  const { control } = useFormContext<TrafficFlowSchemaType>()
  const { operationId, contractId }: UrlParams = useParams()
  const { contractLanes, getContractLanes } = useLaneStore()

  useEffect(() => {
    if (operationId && contractLanes.length === 0) {
      getContractLanes({ operationId, contractId })
    }
  }, [operationId, contractId, contractLanes.length, getContractLanes])

  const lanesItems = useMemo(() => {
    return contractLanes.map(({ lane }) => ({
      id: lane.id,
      label: lane.name
    }))
  }, [contractLanes])

  return (
    <FormField
      control={control}
      name="places.lane_ids"
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormControl>
            <MultiSelect
              items={lanesItems}
              value={field.value ?? []}
              leftIcon={ArrowUpDown}
              onChange={(value) => field.onChange(value.map(Number))}
              placeholder="Faixas"
              notFoundItemPlaceholder="Nenhuma faixa encontrada"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
