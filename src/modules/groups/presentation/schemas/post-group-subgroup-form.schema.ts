import { z } from 'zod'

export const PostGroupSubgroupFormSchema = z.object({
  subgroupId: z.array(z.number())
})

export type PostGroupSubgroupFormType = z.infer<
  typeof PostGroupSubgroupFormSchema
>
