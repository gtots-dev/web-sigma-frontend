import { MESSAGES_PASSWORD_RESET } from '@/modules/shared/presentation/messages/password-reset'
import { z } from 'zod'

export const PutUserPasswordResetFormSchema = z.object({
  userId: z.number(),
  days_passwd_reg_deadline: z.number().int().gt(0, {
    message: MESSAGES_PASSWORD_RESET['2.16']
  })
})

export type PutUserPasswordResetFormType = z.infer<
  typeof PutUserPasswordResetFormSchema
>
