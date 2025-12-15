import { MESSAGES_POINT } from '@/modules/shared/presentation/messages/points'
import { z } from 'zod'

export const PatchPointFormSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .nonempty({
      message: MESSAGES_POINT['14.6']
    })
    .max(150, {
      message: MESSAGES_POINT['14.13']
    }),
  description: z
    .string()
    .max(150, {
      message: MESSAGES_POINT['14.14']
    })
    .optional()
    .nullable()
    .transform((val) => (!val || val.trim() === '' ? null : val)),
  cfg: z.string().optional()
})

export type PatchPointFormType = z.infer<typeof PatchPointFormSchema>
