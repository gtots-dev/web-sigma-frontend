import { z } from 'zod'

export const PostGroupPointFormSchema = z.object({
  pointId: z.array(z.number())
})

export type PostGroupPointFormType = z.infer<typeof PostGroupPointFormSchema>
