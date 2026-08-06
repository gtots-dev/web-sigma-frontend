'use client'

import { useMemo, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { ShieldAlert } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { useParams } from 'next/navigation'
import { useRestrictionStore } from '@/modules/restrictions/presentation/stores/restrictions.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { InfractionsFiltersSchemaType } from '@/modules/infractions/presentation/hooks/use-infractions-filters-schema.hook'
import { MultiSelect } from '@/modules/shared/presentation/components/multi-select/multi-select.component'

export function InfractionsFormInputRestrictionsComponent() {
  const { control } = useFormContext<InfractionsFiltersSchemaType>()
  const { operationId, contractId }: UrlParams = useParams()
  const { restrictions, getRestrictions } = useRestrictionStore()

  useEffect(() => {
    if (operationId && contractId && restrictions.length === 0) {
      getRestrictions({ operationId, contractId })
    }
  }, [operationId, contractId, restrictions.length, getRestrictions])

  const restrictionItems = useMemo(() => {
    return restrictions.map(({ id, name }) => ({
      id,
      label: name
    }))
  }, [restrictions])

  return (
    <FormField
      control={control}
      name="restriction_id"
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormControl>
            <MultiSelect
              items={restrictionItems}
              value={Array.isArray(field.value) ? field.value : []}
              leftIcon={ShieldAlert}
              onChange={(value) => field.onChange(value.map(Number))}
              placeholder="Restrições"
              notFoundItemPlaceholder="Nenhuma restrição encontrada"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
