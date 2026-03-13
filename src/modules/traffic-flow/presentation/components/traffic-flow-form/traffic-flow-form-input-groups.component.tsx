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
import { useGroupStore } from '@/modules/groups/presentation/stores/group.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { TrafficFlowSchemaType } from '@/modules/traffic-flow/presentation/hooks/use-traffic-flow-schema.hook'
import { MultiSelect } from '@/modules/shared/presentation/components/multi-select/multi-select.component'

interface TrafficFlowGroupsComponentProps {
  require?: boolean
  description?: string
}

export function TrafficFlowGroupsComponent({
  require,
  description
}: TrafficFlowGroupsComponentProps) {
  const { control } = useFormContext<TrafficFlowSchemaType>()
  const { operationId, contractId }: UrlParams = useParams()
  const { groups, getGroups } = useGroupStore()

  useEffect(() => {
    if (operationId) {
      getGroups({ operationId, contractId })
    }
  }, [operationId, getGroups])

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
        <FormItem className="flex flex-col w-full lg:w-auto">
          <FormLabel className="flex items-center gap-x-1.5 text-sm dark:text-zinc-50">
            Grupos{require ? ': *' : ':'}
            <HelpMeButtonComponent description={description} />
          </FormLabel>

          <FormControl>
            <MultiSelect
              items={groupsItems}
              value={field.value ?? []}
              className="w-full md:min-w-[190px]"
              onChange={(value) => field.onChange(value.map(Number))}
              placeholder="Selecionar grupos"
              notFoundItemPlaceholder="Nenhum grupo encontrado"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
