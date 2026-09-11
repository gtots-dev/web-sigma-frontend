import { z } from 'zod'

export const InfractionsFiltersSchema = z.object({
  places: z
    .object({
      lane_ids: z.array(z.number()).nullable(),
      point_ids: z.array(z.number()).nullable(),
      group_ids: z.array(z.number()).nullable()
    })
    .nullable(),
  date_range: z
    .object({
      start: z.string().nullable(),
      end: z.string().nullable()
    })
    .nullable(),
  time_range: z
    .object({
      start: z.string().nullable(),
      end: z.string().nullable()
    })
    .nullable(),
  violation_id: z.array(z.number()).nullable(),
  restriction_id: z.array(z.number()).nullable()
})

export type InfractionsFiltersSchemaType = z.infer<typeof InfractionsFiltersSchema>
