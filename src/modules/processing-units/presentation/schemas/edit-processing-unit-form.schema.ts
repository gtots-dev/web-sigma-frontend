import { MESSAGES_PROCESSING_UNIT } from '@/modules/shared/presentation/messages/processing-unit'
import { z } from 'zod'

export const EditProcessingUnitFormSchema = z.object({
  id: z.number(),
  name: z.string().nonempty({
    message: MESSAGES_PROCESSING_UNIT['7.6']
  }),
  cfg: z.string().nullable().optional(),
  processingUnit_id: z.number(),
  operation_id: z.number()
})

export type EditProcessingUnitFormType = z.infer<
  typeof EditProcessingUnitFormSchema
>
