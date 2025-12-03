import { MESSAGES_USERS } from '@/modules/shared/presentation/messages/users'
import { z } from 'zod'

const VALID_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf']
const MAX_SIZE_MB = 10

export const EditUserFormSchema = z.object({
  name: z
    .string()
    .nonempty({
      message: MESSAGES_USERS['5.6']
    })
    .max(150, {
      message: MESSAGES_USERS['5.36']
    }),
  email: z
    .string()
    .nonempty({
      message: MESSAGES_USERS['5.7']
    })
    .max(150, {
      message: MESSAGES_USERS['5.36']
    })
    .email({
      message: MESSAGES_USERS['5.12']
    })
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: MESSAGES_USERS['5.12']
    }),
  company: z
    .string()
    .max(150, {
      message: MESSAGES_USERS['5.36']
    })
    .optional()
    .nullable()
    .transform((val) => (!val || val.trim() === '' ? null : val)),
  position: z
    .string()
    .max(150, {
      message: MESSAGES_USERS['5.36']
    })
    .optional()
    .nullable()
    .transform((val) => (!val || val.trim() === '' ? null : val)),
  login_name: z
    .string()
    .nonempty({
      message: MESSAGES_USERS['5.10']
    })
    .max(150, {
      message: MESSAGES_USERS['5.36']
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
    .max(150, {
      message: MESSAGES_USERS['5.32']
    })
    .optional()
    .nullable()
    .transform((val) => (!val || val.trim() === '' ? null : val))
})

export type EditUserFormType = z.infer<typeof EditUserFormSchema>
