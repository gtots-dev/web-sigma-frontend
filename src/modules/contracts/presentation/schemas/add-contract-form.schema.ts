import { MESSAGES_CONTRACTS } from '@/modules/shared/presentation/messages/contracts'
import { z } from 'zod'

export const AddContractFormSchema = z.object({
  name: z.string().nonempty({
    message: MESSAGES_CONTRACTS['3.6']
  }),
  alias: z.string().nonempty({
    message: ''
  }),
  cfg: z.string().nonempty({
    message: ''
  })
})

export type AddContractFormType = z.infer<typeof AddContractFormSchema>
