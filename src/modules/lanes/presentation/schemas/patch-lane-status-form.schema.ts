import { z } from 'zod'

export const PatchLaneStatusFormSchema = z.object({
  id: z.number(),
  enabled: z.boolean()
})

export type PatchLaneStatusFormType = z.infer<
  typeof PatchLaneStatusFormSchema
>
