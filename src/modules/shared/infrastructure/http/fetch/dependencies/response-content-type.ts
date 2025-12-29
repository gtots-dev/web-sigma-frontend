export function getContentType(response: Response): string {
  return response.headers.get('content-type') ?? ''
}
