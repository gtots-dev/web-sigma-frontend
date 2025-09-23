export interface ActivityReportInterface {
  id: number
  user: {
    id: number
    name: string
  } | null
  operation: {
    id: number
    name: string
  }
  contract: {
    id: number
    name: string
  } | null
  changes?: Record<string, { de: string; para: string }> | null
  action: string
  data?: Record<string, string> | null
  created_at: string
}
