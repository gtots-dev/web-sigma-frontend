import { z } from 'zod'

export const EditContractFormSchema = z.object({
  name: z.string().optional(),
  alias: z.string().optional(),
  cfg: z.string().nullable().optional(),
  enabled: z.boolean().nullable()
})

export type EditContractFormType = z.infer<typeof EditContractFormSchema>
