import { MESSAGES_GROUP } from '@/modules/shared/presentation/messages/groups'
import { z } from 'zod'

export const PatchGroupFormSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .nonempty({
      message: MESSAGES_GROUP['14.6']
    })
    .max(150, {
      message: MESSAGES_GROUP['14.13']
    }),
  description: z
    .string()
    .max(150, {
      message: MESSAGES_GROUP['14.14']
    })
    .optional()
    .nullable()
    .transform((val) => (!val || val.trim() === '' ? null : val)),
  cfg: z.string()
})

export type PatchGroupFormType = z.infer<typeof PatchGroupFormSchema>
