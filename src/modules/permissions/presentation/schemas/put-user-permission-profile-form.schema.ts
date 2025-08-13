import { z } from 'zod'

export const PutPermissionProfileStatusFormSchema = z.object({
  permissionProfileId: z.number(),
  enabled: z.boolean().nullable()
})

export type PutPermissionProfileStatusFormType = z.infer<
  typeof PutPermissionProfileStatusFormSchema
>
