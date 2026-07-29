'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { Ban } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import type { InfractionsFiltersSchemaType } from '@/modules/infractions/presentation/hooks/use-infractions-filters-schema.hook'
import { MultiSelect } from '@/modules/shared/presentation/components/multi-select/multi-select.component'

export function InfractionsFormInputRestrictionsComponent() {
  const { control } = useFormContext<InfractionsFiltersSchemaType>()

  const restrictionItems = useMemo(() => [], [])

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
              leftIcon={Ban}
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
