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
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { TrafficFlowSchemaType } from '@/modules/traffic-flow/presentation/hooks/use-traffic-flow-schema.hook'
import { MultiSelect } from '@/modules/shared/presentation/components/multi-select/multi-select.component'

interface TrafficFlowLanesComponentProps {
  require?: boolean
  description?: string
}

export function TrafficFlowLanesComponent({
  require,
  description
}: TrafficFlowLanesComponentProps) {
  const { control } = useFormContext<TrafficFlowSchemaType>()
  const { operationId, contractId }: UrlParams = useParams()
  const { contractLanes, getContractLanes } = useLaneStore()

  useEffect(() => {
    if (operationId) {
      getContractLanes({ operationId, contractId })
    }
  }, [operationId, getContractLanes])

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
        <FormItem className="flex flex-col">
          <FormLabel className="flex items-center gap-x-1.5 text-sm dark:text-zinc-50">
            Faixas{require ? ': *' : ':'}
            <HelpMeButtonComponent description={description} />
          </FormLabel>

          <FormControl>
            <MultiSelect
              items={lanesItems}
              value={field.value ?? []}
              className="min-w-[190px]"
              onChange={(value) => field.onChange(value.map(Number))}
              placeholder="Selecionar faixas"
              notFoundItemPlaceholder="Nenhuma faixa encontrada"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
