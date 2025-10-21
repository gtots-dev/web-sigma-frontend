import { z } from 'zod'

export const PutProcessingUnitStatusFormSchema = z.object({
  id: z.number(),
  enabled: z.boolean()
})

export type PutProcessingUnitStatusFormType = z.infer<
  typeof PutProcessingUnitStatusFormSchema
>
