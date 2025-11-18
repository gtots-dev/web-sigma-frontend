import { MESSAGES_POINT } from '@/modules/shared/presentation/messages/points'
import { z } from 'zod'

export const PatchPointFormSchema = z.object({
  id: z.number(),
  name: z.string().nonempty({
    message: MESSAGES_POINT['14.4']
  }),
  description: z.string(),
  cfg: z.string()
})

export type PatchPointFormType = z.infer<typeof PatchPointFormSchema>
