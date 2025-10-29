import { z } from 'zod'

export const PatchUserStatusFormSchema = z.object({
  id: z.number(),
  enabled: z.boolean().nullable()
})

export type PatchUserStatusFormType = z.infer<typeof PatchUserStatusFormSchema>
