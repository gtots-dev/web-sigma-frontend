import { z } from 'zod'

export const ActivityReportSchema = z.object({
  actions: z.array(z.string()).optional(),
  contract_ids: z.array(z.number()).optional(),
  operation_ids: z.array(z.number()).optional(),
  user_ids: z.array(z.number()).optional(),
  date_range: z.object({
    start: z.string().nullable(),
    end: z.string().nullable()
  }),
  page: z.number().min(1),
  per_page: z.number().min(1)
})

export type ActivityReportSchemaType = z.infer<typeof ActivityReportSchema>
