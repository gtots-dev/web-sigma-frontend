import { MESSAGES_PROCESSING_UNIT } from '@/modules/shared/presentation/messages/processing-unit'
import { z } from 'zod'

export const AddProcessingUnitFormSchema = z.object({
  name: z.string().nonempty({
    message: MESSAGES_PROCESSING_UNIT['7.6']
  }),
  cfg: z.string().nullable().optional(),
  contract_id: z.number(),
  operation_id: z.number()
})

export type AddProcessingUnitFormType = z.infer<
  typeof AddProcessingUnitFormSchema
>
