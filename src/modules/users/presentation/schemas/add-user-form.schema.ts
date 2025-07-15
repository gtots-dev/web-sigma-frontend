import { MESSAGES_PASSWORD_RESET } from '@/modules/shared/presentation/messages/password-reset'
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
  days_passwd_reg_deadline: z
    .number()
    .int()
    .gt(0, {
      message: MESSAGES_PASSWORD_RESET['2.16']
    })
    .max(365, {
      message: MESSAGES_PASSWORD_RESET['2.17']
    }),
  files: z
    .array(z.instanceof(File))
    .refine(
      (files: File[]) =>
        files.every((file: File) => VALID_TYPES.includes(file.type)),
      {
        message: MESSAGES_USERS['5.20']
      }
    )
    .refine(
      (files: File[]) =>
        files.every((file: File) => file.size <= MAX_SIZE_MB * 1024 * 1024),
      { message: MESSAGES_USERS['5.31'] }
    )
    .optional(),
  description: z
    .string()
    .max(255, {
      message: MESSAGES_USERS['5.32']
    })
    .optional()
})

export type AddUserFormType = z.infer<typeof AddUserFormSchema>
