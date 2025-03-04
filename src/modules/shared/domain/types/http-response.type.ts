export interface HttpResponse<T> {
  success: boolean
  status: string
  data: T
  message?: string
}
