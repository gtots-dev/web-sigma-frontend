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
    .min(1, { message: MESSAGES_USERS['5.26'] })
    .refine((files) => files.every((file) => VALID_TYPES.includes(file.type)), {
      message: 'Formato de arquivo inválido. Permitidos: PNG, JPG, JPEG e PDF.'
    })
    .refine(
      (files) => files.every((file) => file.size <= MAX_SIZE_MB * 1024 * 1024),
      { message: 'Cada arquivo deve ter no máximo 10MB.' }
    )
    .optional(),
  description: z.string().optional()
})

export type EditUserFormType = z.infer<typeof EditUserFormSchema>
