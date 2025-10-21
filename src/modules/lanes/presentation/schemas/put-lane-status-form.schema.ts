import { z } from 'zod'

export const PutLaneStatusFormSchema = z.object({
  id: z.number(),
  enabled: z.boolean()
})

export type PutLaneStatusFormType = z.infer<
  typeof PutLaneStatusFormSchema
>
