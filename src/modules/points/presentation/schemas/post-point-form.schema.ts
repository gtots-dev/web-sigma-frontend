import { z } from 'zod'

export const PostPointFormSchema = z.object({
  name: z.string().nonempty({
    message: ''
  }),
  description: z.string(),
  cfg: z.string()
})

export type PostPointFormType = z.infer<typeof PostPointFormSchema>
