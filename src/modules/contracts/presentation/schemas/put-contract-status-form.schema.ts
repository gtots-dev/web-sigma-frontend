import { z } from 'zod'

export const PutContractStatusFormSchema = z.object({
  id: z.number(),
  enabled: z.boolean()
})

export type PutContractStatusFormType = z.infer<
  typeof PutContractStatusFormSchema
>
