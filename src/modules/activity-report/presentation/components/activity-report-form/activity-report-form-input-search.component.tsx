'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  FormControl,
  FormField,
  FormItem
} from '@/modules/shared/presentation/components/shadcn/form'
import { Input } from '@/modules/shared/presentation/components/shadcn/input'
import { Search } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import type { ActivityReportSchemaType } from '../../hooks/use-activity-schema.hook'
import { useActivityReportSubmit } from '../../hooks/use-activity-submit.hook'

export function ActivityReportFormInputSearchComponent() {
  const { control, handleSubmit } = useFormContext<ActivityReportSchemaType>()
  const { handleSubmit: onSubmit } = useActivityReportSubmit()

  return (
    <FormField
      name="actions"
      control={control}
      render={({ field }) => (
        <FormItem className="flex justify-end w-full">
          <div className="flex w-full max-w-[600px]">
            <FormControl>
              <Input
                type="text"
                id="actions"
                autoComplete="off"
                className="dark:text-zinc-50 dark:border-zinc-800 dark:focus:border-zinc-800 focus-visible:ring-0 border-r-0 rounded-tr-none w-full rounded-br-none "
                style={{ minWidth: 'auto' }}
                placeholder="Busque aqui..."
                {...field}
              />
            </FormControl>
            <Button
              className="rounded-tl-none rounded-bl-none"
              variant="primary"
              size="icon"
              onClick={handleSubmit(onSubmit)}
            >
              <Search />
            </Button>
          </div>
        </FormItem>
      )}
    />
  )
}
