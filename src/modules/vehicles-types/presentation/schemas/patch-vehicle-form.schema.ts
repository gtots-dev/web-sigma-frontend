import { MESSAGES_VEHICLES } from '@/modules/shared/presentation/messages/vehicles'
import { z } from 'zod'

export const PatchVehicleTypeFormSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .nonempty({
      message: MESSAGES_VEHICLES['20.6']
    })
    .max(150, {
      message: MESSAGES_VEHICLES['20.7']
    }),
  color: z
    .string()
    .nonempty({
      message: MESSAGES_VEHICLES['20.8']
    })
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
      message: MESSAGES_VEHICLES['20.9']
    }),
  code: z.number().optional()
})

export type PatchVehicleTypeFormType = z.infer<
  typeof PatchVehicleTypeFormSchema
>
