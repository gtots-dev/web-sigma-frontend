import { z } from 'zod'

export const PatchContractFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Nome é obrigatório'),
  alias: z.string().min(1, 'Apelido é obrigatório'),
  cfg: z.string().optional()
})

export type PatchContractFormType = z.infer<typeof PatchContractFormSchema>
