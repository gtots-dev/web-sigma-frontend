import { z } from 'zod'
import { MESSAGES_STATUS_PROCESSING_UNITS } from '@/modules/shared/presentation/messages/status-processing-units'

export const IgnoreStatusProcessingUnitsFormSchema = z.object({
  processingUnitIds: z
    .array(z.number())
    .min(1, MESSAGES_STATUS_PROCESSING_UNITS['25.10'])
})

export type IgnoreStatusProcessingUnitsFormType = z.infer<
  typeof IgnoreStatusProcessingUnitsFormSchema
>
