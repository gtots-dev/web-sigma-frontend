import { z } from 'zod'

export const BindUserWithPermissionProfileFormSchema = z.object({
  user_id: z.number(),
  perm_profile_id: z.array(z.number())
})

export type BindUserWithPermissionProfileFormType = z.infer<
  typeof BindUserWithPermissionProfileFormSchema
>
