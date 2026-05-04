'use client'

import { useFormContext } from 'react-hook-form'
import { Check, Square } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import type { TwoFactorInterface } from '@/modules/two-factor/domain/interfaces/two-factor.interface'
import { cn } from '@/modules/shared/presentation/lib/utils'

export function TwpFactorFormInputRememberMeComponente() {
  const { control } = useFormContext<TwoFactorInterface>()

  return (
    <FormField
      control={control}
      name="remember_device"
      render={({ field }) => {
        const checked = !!field.value

        return (
          <FormItem className="flex flex-col">
            <FormControl>
              <div
                onClick={() => field.onChange(!checked)}
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-md text-xs hover:opacity-95 select-none'
                )}
              >
                {checked ? (
                  <Check className="h-4 w-4 opacity-100" />
                ) : (
                  <Square className="h-4 w-4" strokeWidth={1} />
                )}

                <span className="truncate font-medium">
                  Confiar nesse dispositivo
                </span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
