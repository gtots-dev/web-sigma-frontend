import { MESSAGES_PERMISSIONS } from '@/modules/shared/presentation/messages/permissions'
import { z } from 'zod'

export const BindUserWithPermissionProfileFormSchema = z.object({
  perm_profile_id: z.array(z.number()).min(1, {
    message: MESSAGES_PERMISSIONS[6.12]
  })
})

export type BindUserWithPermissionProfileFormType = z.infer<
  typeof BindUserWithPermissionProfileFormSchema
>
