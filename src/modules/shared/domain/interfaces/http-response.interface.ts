export interface HttpResponseInterface<TData, THeaders = unknown> {
  success: boolean
  status: number
  message?: string
  data: TData
  headers: THeaders
}
