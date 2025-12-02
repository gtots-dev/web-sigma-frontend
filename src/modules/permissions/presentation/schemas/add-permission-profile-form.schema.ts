import { MESSAGES_PERMISSIONS } from '@/modules/shared/presentation/messages/permissions'
import { z } from 'zod'

export const AddPermissionProfilesFormSchema = z.object({
  name: z.string().nonempty({
    message: MESSAGES_PERMISSIONS[6.7]
  }),
  description: z
    .string()
    .max(255, {
      message: MESSAGES_PERMISSIONS[6.9]
    })
    .optional()
    .nullable()
    .transform((val) => (!val || val.trim() === '' ? null : val)),
  features: z.array(z.number()).optional()
})

export type AddPermissionProfileFormType = z.infer<
  typeof AddPermissionProfilesFormSchema
>
