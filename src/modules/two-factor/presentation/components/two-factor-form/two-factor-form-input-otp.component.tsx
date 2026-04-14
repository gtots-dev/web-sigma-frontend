'use client'

import { HelpMeButtonComponent } from '@/modules/shared/presentation/components/help-me-button/help-me-button.component'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/modules/shared/presentation/components/shadcn/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/modules/shared/presentation/components/shadcn/input-otp'
import { useOtpInput } from '@/modules/shared/presentation/hooks/use-otp.hook'
import { useFormContext } from 'react-hook-form'
import type { ClipboardEvent } from 'react'
import { REGEXP_ONLY_DIGITS } from 'input-otp'

interface TwoFactorFormInputOTPComponentProps {
  require?: boolean
  description?: string
}

export function TwoFactorFormInputOTPComponent({
  require,
  description
}: TwoFactorFormInputOTPComponentProps) {
  const { control, resetField, setValue } = useFormContext()

  const { handlePaste, handleClear } = useOtpInput({
    setValue,
    resetField
  })

  return (
    <FormField
      name="otp_code"
      control={control}
      render={({ field }) => {
        const onPaste = (event: ClipboardEvent) => {
          const value = handlePaste(event.clipboardData.getData('text'))

          if (value) {
            event.preventDefault()
            field.onChange(value)
          }
        }

        return (
          <FormItem>
            <FormLabel
              className="text-sm flex items-center gap-x-1.5 dark:text-zinc-50"
              htmlFor="otp_code"
            >
              Autenticação de dois fatores{require ? ': *' : ':'}
              <HelpMeButtonComponent description={description} />
            </FormLabel>

            <FormControl>
              <InputOTP
                id="otp_code"
                value={field.value ?? ''}
                onChange={field.onChange}
                onPaste={onPaste}
                autoComplete="one-time-code"
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
              >
                <InputOTPGroup className="flex w-full h-[45px]">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="flex-1 w-full h-full"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </FormControl>

            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-muted-foreground hover:text-red-500 transition-colors"
              >
                Limpar código
              </button>
            </div>

            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
