import { z } from 'zod'
import { MESSAGES_CONTRACTS } from '@/modules/shared/presentation/messages/contracts'

const VALID_IMAGE_TYPES = [
  'image/png',
  'image/jpg',
  'image/jpeg'
]
const MAX_SIZE_MB = 10

export const PatchContractFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Nome é obrigatório'),
  alias: z.string().min(1, 'Apelido é obrigatório'),
  cfg: z.string().optional(),
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

export type PatchContractFormType = z.infer<typeof PatchContractFormSchema>
