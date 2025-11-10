import { MESSAGES_LANE } from '@/modules/shared/presentation/messages/lanes'
import { z } from 'zod'

export const AddLaneFormSchema = z.object({
  name: z.string().nonempty({
    message: MESSAGES_LANE['8.6']
  }),
  cfg: z.string().nullable().optional(),
})

export type AddLaneFormType = z.infer<typeof AddLaneFormSchema>
