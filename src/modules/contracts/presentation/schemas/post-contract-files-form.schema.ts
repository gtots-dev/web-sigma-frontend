import { MESSAGES_CONTRACTS } from '@/modules/shared/presentation/messages/contracts'
import { z } from 'zod'

const VALID_IMAGE_TYPES = [
  'image/png',
  'image/jpg',
  'image/jpeg'
]
const MAX_SIZE_MB = 10

export const PostContractFilesFormSchema = z.object({
  files: z
    .array(z.instanceof(File))
    .min(1, {
      message: 'Selecione a imagem do logotipo.'
    })
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
})

export type PostContractFilesFormType = z.infer<
  typeof PostContractFilesFormSchema
>
