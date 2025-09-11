export interface ActivityReportInterface {
  id: number
  user: {
    id: number
    name: string
  }
  operation: {
    id: number
    name: string
  }
  contract: {
    id: number
    name: string
  }
  action: string
  data: string
  created_at: string
}
