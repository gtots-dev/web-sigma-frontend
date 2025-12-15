import { z } from 'zod'

export const PostGroupLaneFormSchema = z.object({
  laneId: z.array(z.number())
})

export type PostGroupLaneFormType = z.infer<typeof PostGroupLaneFormSchema>
