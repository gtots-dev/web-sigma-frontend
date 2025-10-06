import { MESSAGES_PERMISSIONS } from '@/modules/shared/presentation/messages/permissions'
import { z } from 'zod'

export const EditPermissionProfilesFormSchema = z.object({
  name: z.string().nonempty({
    message: MESSAGES_PERMISSIONS[6.7]
  }),
  description: z
    .string()
    .nonempty({
      message: MESSAGES_PERMISSIONS[6.8]
    })
    .max(255, {
      message: MESSAGES_PERMISSIONS[6.9]
    }),
  features: z.array(z.number()).optional()
})

export type EditPermissionProfileFormType = z.infer<
  typeof EditPermissionProfilesFormSchema
>
