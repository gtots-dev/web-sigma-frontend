'use client'

import { useMemo, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Map } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { useParams } from 'next/navigation'
import { useGroupStore } from '@/modules/groups/presentation/stores/group.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { TrafficFlowSchemaType } from '@/modules/traffic-flow/presentation/hooks/use-traffic-flow-schema.hook'
import { MultiSelect } from '@/modules/shared/presentation/components/multi-select/multi-select.component'

export function TrafficFlowGroupsComponent() {
  const { control } = useFormContext<TrafficFlowSchemaType>()
  const { operationId, contractId }: UrlParams = useParams()
  const { groups, getGroups } = useGroupStore()

  useEffect(() => {
    if (operationId && groups.length === 0) {
      getGroups({ operationId, contractId })
    }
  }, [operationId, contractId, groups.length, getGroups])

  const groupsItems = useMemo(() => {
    return groups.map(({ group }) => ({
      id: group.id,
      label: group.name
    }))
  }, [groups])

  return (
    <FormField
      control={control}
      name="places.group_ids"
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormControl>
            <MultiSelect
              items={groupsItems}
              value={field.value ?? []}
              leftIcon={Map}
              onChange={(value) => field.onChange(value.map(Number))}
              placeholder="Grupos"
              notFoundItemPlaceholder="Nenhum grupo encontrado"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
