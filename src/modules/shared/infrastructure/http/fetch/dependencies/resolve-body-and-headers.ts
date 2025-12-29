export type ResolveBodyAndHeaders = (
  data: unknown,
  headers?: HeadersInit
) => {
  body?: BodyInit
  headers: HeadersInit
}

export const resolveBodyAndHeaders: ResolveBodyAndHeaders = (
  data,
  customHeaders
) => {
  const isFormData = data instanceof FormData
  const isJson = data !== undefined && typeof data !== 'string' && !isFormData

  return {
    body: isJson ? JSON.stringify(data) : (data as BodyInit | undefined),
    headers: {
      ...(isJson ? { 'Content-Type': 'application/json' } : {}),
      ...customHeaders
    }
  }
}
