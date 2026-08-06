'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { Input } from '@/modules/shared/presentation/components/shadcn/input'

interface Props {
  name?: string
  label?: string
  require?: boolean
}

export function RestrictionFormInputNameComponent({
  name = 'name',
  label = 'Nome da restrição',
  require
}: Props) {
  const { control } = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-1.5 text-xs font-semibold">
            {label}
            {require ? ': *' : ':'}
          </FormLabel>
          <FormControl>
            <Input placeholder="Digite o nome da restrição" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
