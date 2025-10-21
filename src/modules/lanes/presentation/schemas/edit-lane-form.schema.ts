import { MESSAGES_LANE } from '@/modules/shared/presentation/messages/lanes'
import { z } from 'zod'

export const EditLaneFormSchema = z.object({
  id: z.number(),
  name: z.string().nonempty({
    message: MESSAGES_LANE['8.6']
  }),
  cfg: z.string().nullable().optional(),
  lane_id: z.number(),
  operation_id: z.number(),
  enabled: z.boolean()
})

export type EditLaneFormType = z.infer<typeof EditLaneFormSchema>
