import { MESSAGES_USERS } from '@/modules/shared/presentation/messages/users'
import { z } from 'zod'

const VALID_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf']
const MAX_SIZE_MB = 10

export const PostUserFilesFormSchema = z.object({
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
    .optional()
})

export type PostUserFilesFormType = z.infer<typeof PostUserFilesFormSchema>
