import { z } from 'zod'

export const TrafficFlowSchema = z.object({
  places: z
    .object({
      lane_ids: z.array(z.number()).nullable(),
      point_ids: z.array(z.number()).nullable(),
      group_ids: z.array(z.number()).nullable()
    })
    .nullable(),
  granularity: z.string(),
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
    .nullable()
})

export type TrafficFlowSchemaType = z.infer<typeof TrafficFlowSchema>
