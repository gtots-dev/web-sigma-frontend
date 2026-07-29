'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { FileWarning } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import type { InfractionsFiltersSchemaType } from '@/modules/infractions/presentation/hooks/use-infractions-filters-schema.hook'
import { MultiSelect } from '@/modules/shared/presentation/components/multi-select/multi-select.component'

export function InfractionsFormInputViolationsComponent() {
  const { control } = useFormContext<InfractionsFiltersSchemaType>()
  const violationItems = useMemo(() => [], [])

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
              leftIcon={FileWarning}
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
