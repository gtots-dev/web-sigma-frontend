import { z } from 'zod'
import { MESSAGES_VIOLATIONS } from '@/modules/shared/presentation/messages/violations'

export const patchViolationSchema = z.object({
  code: z
    .number()
    .min(1, { message: 'O código é obrigatório.' })
    .max(999999999, {
      message: 'O código não pode ser maior que 999999999'
    })
    .optional(),
  color: z
    .string({ required_error: MESSAGES_VIOLATIONS['23.6'] })
    .min(1, MESSAGES_VIOLATIONS['23.6'])
})

export type PatchViolationFormType = z.infer<typeof patchViolationSchema>
