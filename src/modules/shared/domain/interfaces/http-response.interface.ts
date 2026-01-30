export interface HttpResponseInterface<T> {
  success: boolean
  status: number
  data?: T
  message?: string
}
