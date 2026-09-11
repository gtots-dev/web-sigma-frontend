import { MESSAGES_VEHICLES } from '@/modules/shared/presentation/messages/vehicles'
import { z } from 'zod'

export const PostVehicleFormSchema = z.object({
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
  code: z
    .number({
      invalid_type_error: MESSAGES_VEHICLES['20.12']
    })
    .min(1, {
      message: MESSAGES_VEHICLES['20.12']
    })
    .max(999999999, {
      message: 'O código não pode ser maior que 999999999'
    })
})

export type PostVehicleFormType = z.infer<typeof PostVehicleFormSchema>
