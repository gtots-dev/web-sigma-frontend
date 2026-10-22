import { z } from 'zod'
import { MESSAGES_STATUS_LANES } from '@/modules/shared/presentation/messages/status-lanes'

export const IgnoreStatusLanesFormSchema = z.object({
  laneIds: z.array(z.number()).min(1, MESSAGES_STATUS_LANES['26.10'])
})

export type IgnoreStatusLanesFormType = z.infer<typeof IgnoreStatusLanesFormSchema>
