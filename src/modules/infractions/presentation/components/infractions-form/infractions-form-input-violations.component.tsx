'use client'

import { useMemo, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { AlertTriangle } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { useParams } from 'next/navigation'
import { useViolationStore } from '@/modules/violations/presentation/stores/violations.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { InfractionsFiltersSchemaType } from '@/modules/infractions/presentation/hooks/use-infractions-filters-schema.hook'
import { MultiSelect } from '@/modules/shared/presentation/components/multi-select/multi-select.component'

export function InfractionsFormInputViolationsComponent() {
  const { control } = useFormContext<InfractionsFiltersSchemaType>()
  const { operationId, contractId }: UrlParams = useParams()
  const { violations, getViolations } = useViolationStore()

  useEffect(() => {
    if (operationId && contractId && violations.length === 0) {
      getViolations({ operationId, contractId })
    }
  }, [operationId, contractId, violations.length, getViolations])

  const violationItems = useMemo(() => {
    return violations.map(({ id, name }) => ({
      id,
      label: name
    }))
  }, [violations])

  return (
    <FormField
      control={control}
      name="violation_id"
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormControl>
            <MultiSelect
              items={violationItems}
              value={Array.isArray(field.value) ? field.value : []}
              leftIcon={AlertTriangle}
              onChange={(value) => field.onChange(value.map(Number))}
              placeholder="Violações"
              notFoundItemPlaceholder="Nenhuma violação encontrada"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
