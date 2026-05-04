export type ParseHeadersType = (
  headers: Headers
) => Record<string, string>

export const parseHeaders: ParseHeadersType = (headers) => {
  return Object.fromEntries(headers.entries())
}