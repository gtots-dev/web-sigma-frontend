export function extractOperationId(pathname: string): string | null {
  const match = pathname.match(/\/operations\/([^/]+)/)
  return match?.[1] ?? null
}
