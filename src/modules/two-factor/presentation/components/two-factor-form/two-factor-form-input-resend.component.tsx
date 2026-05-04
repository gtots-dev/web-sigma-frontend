'use client'

import {
  FormField,
  FormItem,
  FormControl
} from '@/modules/shared/presentation/components/shadcn/form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useFormContext } from 'react-hook-form'
import type { ReactNode } from 'react'
import { useOtpResend } from '../../hooks/use-two-factor-resend.hook'

interface TwoFactorResendCodeComponentProps {
  children: ReactNode
  cooldownSeconds?: number
  onResend: () => Promise<void>
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export function TwoFactorResendCodeComponent({
  cooldownSeconds = 60,
  children,
  onResend
}: TwoFactorResendCodeComponentProps) {
  const { control } = useFormContext()

  const { cooldown, isBlocked, isResending, handleResend } = useOtpResend({
    cooldownSeconds,
    onResend
  })

  return (
    <FormField
      name="otp_resend"
      control={control}
      render={() => (
        <FormItem>
          <FormControl>
            <div className="flex flex-col items-start gap-y-2">
              <Button
                type="button"
                variant="ghost"
                className="text-xs p-0 h-auto hover:bg-transparent hover:opacity-85"
                disabled={isBlocked || isResending}
                onClick={handleResend}
              >
                {isResending
                  ? 'Enviando...'
                  : isBlocked
                    ? `Reenviar em ${formatTime(cooldown)}`
                    : 'Reenviar código'}
              </Button>

              {children}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  )
}
