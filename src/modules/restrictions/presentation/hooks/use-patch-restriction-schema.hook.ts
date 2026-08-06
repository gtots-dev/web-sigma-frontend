import { z } from 'zod'
import { MESSAGES_RESTRICTIONS } from '@/modules/shared/presentation/messages/restrictions'

export const patchRestrictionSchema = z.object({
  name: z.string().min(1, MESSAGES_RESTRICTIONS['24.6']).max(150, MESSAGES_RESTRICTIONS['24.7']),
  code: z
    .number({ invalid_type_error: MESSAGES_RESTRICTIONS['24.12'] })
    .min(1, MESSAGES_RESTRICTIONS['24.12'])
    .max(999999999, {
      message: 'O código não pode ser maior que 999999999'
    }),
  color: z.string().min(1, MESSAGES_RESTRICTIONS['24.8'])
})

export type PatchRestrictionFormType = z.infer<typeof patchRestrictionSchema>
