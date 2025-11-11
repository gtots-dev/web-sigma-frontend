import { MESSAGES_LANE } from '@/modules/shared/presentation/messages/lanes'
import { z } from 'zod'

export const EditLaneFormSchema = z.object({
  id: z.number(),
  name: z.string().nonempty({
    message: MESSAGES_LANE['8.6']
  }),
  cfg: z.string().nullable().optional()
})

export type EditLaneFormType = z.infer<typeof EditLaneFormSchema>
