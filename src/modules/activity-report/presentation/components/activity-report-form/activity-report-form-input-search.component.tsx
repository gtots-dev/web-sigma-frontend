'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import { Search } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import type { ActivityReportSchemaType } from '../../hooks/use-activity-schema.hook'

export function ActivityReportFormInputSearchComponent() {
  const { control } = useFormContext<ActivityReportSchemaType>()

  return (
    <FormField
      name="actions"
      control={control}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormControl>
            <div className="h-9 gap-2 px-3 bg-muted/20 border border-border/50 hover:bg-muted/40 transition-all rounded-md w-full shadow-none flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden w-full h-full">
                <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <div className="flex items-center gap-2 border-l border-border/50 pl-2 overflow-hidden w-full">
                  <input
                    type="text"
                    id="actions"
                    autoComplete="off"
                    className="w-full h-full bg-transparent border-none outline-none ring-0 p-0 text-xs font-semibold placeholder:text-muted-foreground placeholder:font-semibold dark:text-zinc-50"
                    placeholder="Busque por palavra-chave..."
                    {...field}
                    value={field.value ?? ''}
                  />
                </div>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
