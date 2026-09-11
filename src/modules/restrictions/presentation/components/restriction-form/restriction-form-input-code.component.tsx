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

export function RestrictionFormInputCodeComponent({
  name = 'code',
  label = 'Código da restrição',
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
            <Input
              type="number"
              min={1}
              max={999999999}
              placeholder="Digite o código"
              {...field}
              onChange={(e) => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
