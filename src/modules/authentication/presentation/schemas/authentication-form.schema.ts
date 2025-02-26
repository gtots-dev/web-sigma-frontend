import { MESSAGES_AUTHENTICATION } from '@/modules/shared/presentation/messages/authentication'
import { z } from 'zod'

export const AuthenticationFormSchema = z.object({
  username: z.string().nonempty({
    message: MESSAGES_AUTHENTICATION['1.7']
  }),
  password: z
    .string()
    .nonempty({
      message: MESSAGES_AUTHENTICATION['1.8']
    })
    .max(64, {
      message: MESSAGES_AUTHENTICATION['1.9']
    })
    .regex(/[A-Z]/, {
      message: MESSAGES_AUTHENTICATION['1.10']
    })
    .regex(/[a-z]/, {
      message: MESSAGES_AUTHENTICATION['1.11']
    })
    .regex(/[0-9]/, {
      message: MESSAGES_AUTHENTICATION['1.12']
    })
    .regex(/[#@$!%*?&]/, {
      message: MESSAGES_AUTHENTICATION['1.13']
    })
})

export type AuthenticationFormType = z.infer<typeof AuthenticationFormSchema>
