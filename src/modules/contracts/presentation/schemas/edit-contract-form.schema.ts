import { z } from 'zod'

export const EditContractFormSchema = z.object({
  name: z.string().optional(),
  alias: z.string().optional(),
  cfg: z.string().nullable().optional()
})

export type EditContractFormType = z.infer<typeof EditContractFormSchema>
