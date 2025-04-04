export interface HttpRequestConfig<TData = unknown, TParams = Record<string, string | number | boolean>> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url: string
  data?: TData
  params?: TParams
  headers?: Record<string, string>
}
  