import { MESSAGES_POINT } from '@/modules/shared/presentation/messages/points'
import { z } from 'zod'

export const PostPointFormSchema = z.object({
  name: z.string().nonempty({
    message: MESSAGES_POINT['14.6']
  }),
  description: z.string(),
  cfg: z.string()
})

export type PostPointFormType = z.infer<typeof PostPointFormSchema>
