import { z } from 'zod'

export const PatchPermissionProfileStatusFormSchema = z.object({
  id: z.number(),
  enabled: z.boolean().nullable()
})

export type PatchPermissionProfileStatusFormType = z.infer<
  typeof PatchPermissionProfileStatusFormSchema
>
