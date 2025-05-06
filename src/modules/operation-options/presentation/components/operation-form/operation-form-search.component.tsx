'use client'

import { useFormContext } from 'react-hook-form'
import { Input } from '@/modules/shared/presentation/components/shadcn/input'
import { Search } from 'lucide-react'

export function OperationFormSearchComponent() {
  const { register } = useFormContext()

  return (
    <label
      className="flex items-center w-full border-b px-4"
      htmlFor="input-search"
    >
      <Search className="h-4 w-4 text-muted-foreground" />
      <Input
        {...register('search')}
        className="border-none shadow-none ring-0 focus-visible:!ring-0 text-sm"
        type="text"
        placeholder="Procure aqui o desejado"
        id="input-search"
      />
    </label>
  )
}
