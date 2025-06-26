import { MESSAGES_PERMISSIONS } from '@/modules/shared/presentation/messages/permissions'
import { z } from 'zod'

export const AddPermissionProfilesFormSchema = z.object({
  name: z.string().nonempty({
    message: MESSAGES_PERMISSIONS[6.7]
  }),
  features: z.array(z.number()).optional()
})

export type AddPermissionProfileFormType = z.infer<
  typeof AddPermissionProfilesFormSchema
>
