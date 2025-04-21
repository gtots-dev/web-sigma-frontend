import { MESSAGES_USERS } from '@/modules/shared/presentation/messages/users'
import { z } from 'zod'

export const EditUserFormSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  email: z
    .string()
    .optional()
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: MESSAGES_USERS['5.12']
    }),
  company: z.string().optional(),
  position: z.string().optional(),
  login_name: z.string().optional(),
  password: z
    .string()
    .max(64, {
      message: MESSAGES_USERS['5.9']
    })
    .optional()
})

export type EditUserFormType = z.infer<typeof EditUserFormSchema>
