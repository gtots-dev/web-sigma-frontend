import { z } from 'zod'

export const PostPointLaneFormSchema = z.object({
  laneId: z.array(z.number())
})

export type PostPointLaneFormType = z.infer<typeof PostPointLaneFormSchema>
