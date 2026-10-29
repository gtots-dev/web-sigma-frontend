import { MESSAGES_CONTRACTS } from '@/modules/shared/presentation/messages/contracts'
import { z } from 'zod'

const VALID_IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg']
const MAX_SIZE_MB = 10

export const AddContractFormSchema = z.object({
  name: z.string().nonempty({
    message: MESSAGES_CONTRACTS['3.6']
  }),
  alias: z.string().nonempty({
    message: ''
  }),
  cfg: z.string().nullable().optional(),
  files: z
    .array(z.instanceof(File))
    .max(1, {
      message: MESSAGES_CONTRACTS['3.31']
    })
    .refine(
      (files: File[]) =>
        files.every((file: File) => VALID_IMAGE_TYPES.includes(file.type)),
      {
        message: MESSAGES_CONTRACTS['3.29']
      }
    )
    .refine(
      (files: File[]) =>
        files.every((file: File) => file.size <= MAX_SIZE_MB * 1024 * 1024),
      { message: MESSAGES_CONTRACTS['3.30'] }
    )
    .optional()
})

export type AddContractFormType = z.infer<typeof AddContractFormSchema>
