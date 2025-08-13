import { z } from 'zod'

export const PutUserStatusFormSchema = z.object({
  userId: z.number(),
  enabled: z.boolean().nullable()
})

export type PutUserStatusFormType = z.infer<typeof PutUserStatusFormSchema>
