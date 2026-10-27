import { z } from 'zod'

export const IgnoreStatusLanesFormSchema = z.object({
  laneIds: z.array(z.number())
})

export type IgnoreStatusLanesFormType = z.infer<
  typeof IgnoreStatusLanesFormSchema
>
