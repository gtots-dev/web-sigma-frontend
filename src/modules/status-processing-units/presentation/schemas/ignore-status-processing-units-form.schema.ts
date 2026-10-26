import { z } from 'zod'

export const IgnoreStatusProcessingUnitsFormSchema = z.object({
  processingUnitIds: z.array(z.number())
})

export type IgnoreStatusProcessingUnitsFormType = z.infer<
  typeof IgnoreStatusProcessingUnitsFormSchema
>
