import { MESSAGES_USERS } from '@/modules/shared/presentation/messages/users'
import { z } from 'zod'

const VALID_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf']
const MAX_SIZE_MB = 10

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
  enabled: z.boolean().nullable(),
    files: z
      .array(z.instanceof(File))
      .refine((files: File[]) => files.every((file: File) => VALID_TYPES.includes(file.type)), {
        message: MESSAGES_USERS['5.20']
      })
      .refine(
        (files: File[]) => files.every((file: File) => file.size <= MAX_SIZE_MB * 1024 * 1024),
        { message: MESSAGES_USERS['5.31'] }
      )
      .optional(),
    description: z.string().max(255, {
      message: MESSAGES_USERS['5.32']
    }).optional()
})

export type EditUserFormType = z.infer<typeof EditUserFormSchema>
