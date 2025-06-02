import { MESSAGES_PASSWORD_RESET } from '@/modules/shared/presentation/messages/password-reset'
import { z } from 'zod'
import type { PasswordResetFormInterface } from '../../domain/interfaces/password-reset-form.interface'

export const PasswordResetFormSchema = z
  .object({
    newPassword: z
      .string()
      .nonempty({
        message: MESSAGES_PASSWORD_RESET['2.3']
      })
      .max(64, {
        message: MESSAGES_PASSWORD_RESET['2.8']
      })
      .refine((val: string) => /[A-Z]/.test(val), {
        message: MESSAGES_PASSWORD_RESET['2.9']
      })
      .refine((val: string) => /[a-z]/.test(val), {
        message: MESSAGES_PASSWORD_RESET['2.10']
      })
      .refine((val: string) => /\d/.test(val), {
        message: MESSAGES_PASSWORD_RESET['2.11']
      })
      .refine((val: string) => /[#@\$!%*?&]/.test(val), {
        message: MESSAGES_PASSWORD_RESET['2.12']
      }),
    passwordConfirm: z
      .string()
      .nonempty({
        message: MESSAGES_PASSWORD_RESET['2.4']
      })
      .max(64, {
        message: MESSAGES_PASSWORD_RESET['2.8']
      })
  })
  .refine(
    ({ newPassword, passwordConfirm }: PasswordResetFormInterface) =>
      newPassword === passwordConfirm,
    {
      path: ['passwordConfirm'],
      message: MESSAGES_PASSWORD_RESET['2.5']
    }
  )
