import { MESSAGES_USERS } from '@/modules/shared/presentation/messages/users'
import { z } from 'zod'

export const AddUserFormSchema = z.object({
  name: z.string().nonempty({
    message: MESSAGES_USERS['5.6']
  }),
  email: z
    .string()
    .nonempty({
      message: MESSAGES_USERS['5.7']
    })
    .email({
      message: MESSAGES_USERS['5.12']
    }),
  company: z.string().nonempty({
    message: MESSAGES_USERS['5.8']
  }),
  position: z.string().nonempty({
    message: MESSAGES_USERS['5.9']
  }),
  login_name: z.string().nonempty({
    message: MESSAGES_USERS['5.10']
  }),
  password: z
    .string()
    .nonempty({
      message: MESSAGES_USERS['5.11']
    })
    .max(64, {
      message: MESSAGES_USERS['5.9']
    })
})

export type AddUserFormType = z.infer<typeof AddUserFormSchema>
