import { z } from 'zod'

export const PatchPointFormSchema = z.object({
  id: z.number(),
  name: z.string().nonempty({
    message: ''
  }),
  description: z.string(),
  cfg: z.string()
})

export type PatchPointFormType = z.infer<typeof PatchPointFormSchema>
