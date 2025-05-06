import { MESSAGES_USERS } from '@/modules/shared/presentation/messages/users'
import { z } from 'zod'

const VALID_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf']
const MAX_SIZE_MB = 10

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
    }),
  passwd_reg_deadline: z.number().nullable(),
  files: z
    .array(z.instanceof(File))
    .refine((files) => files.every((file) => VALID_TYPES.includes(file.type)), {
      message: MESSAGES_USERS['5.20']
    })
    .refine(
      (files) => files.every((file) => file.size <= MAX_SIZE_MB * 1024 * 1024),
      { message: 'Cada arquivo deve ter no máximo 10MB.' }
    )
    .optional(),
  description: z.string().optional()
})

export type AddUserFormType = z.infer<typeof AddUserFormSchema>
