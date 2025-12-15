import { z } from 'zod'

export const PatchGroupStatusFormSchema = z.object({
  id: z.number(),
  enabled: z.boolean()
})

export type PatchGroupStatusFormType = z.infer<
  typeof PatchGroupStatusFormSchema
>
