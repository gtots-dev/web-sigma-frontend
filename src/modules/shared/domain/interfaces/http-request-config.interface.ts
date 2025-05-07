export interface HttpRequestConfig<TData = unknown, TParams = unknown> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url: string
  data?: TData
  params?: TParams
  headers?: Record<string, string>
}
