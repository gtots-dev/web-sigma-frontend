import { MESSAGES_TWO_FACTOR } from '@/modules/shared/presentation/messages/two-factor'
import { z } from 'zod'

export const TwoFactorFormSchema = z.object({
  otp_code: z.string().nonempty({
    message: MESSAGES_TWO_FACTOR['21.4']
  })
})
