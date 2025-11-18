import { z } from 'zod'

export const PatchPointStatusFormSchema = z.object({
  id: z.number(),
  enabled: z.boolean()
})

export type PatchPointStatusFormType = z.infer<
  typeof PatchPointStatusFormSchema
>
