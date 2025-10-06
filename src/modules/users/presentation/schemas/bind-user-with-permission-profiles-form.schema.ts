import { z } from 'zod'

export const BindUserWithPermissionProfileFormSchema = z.object({
  user_id: z.number(),
  perm_profile_id: z.array(z.number()),
  profiles: z.array(
    z.object({
      perm_profile_id: z.number(),
      contract_ids: z.array(z.number())
    })
  )
})

export type BindUserWithPermissionProfileFormType = z.infer<
  typeof BindUserWithPermissionProfileFormSchema
>
