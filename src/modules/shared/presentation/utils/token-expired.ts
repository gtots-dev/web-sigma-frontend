export function isTokenExpired(exp?: number): boolean {
  return exp ? exp * 1000 < Date.now() : true
}
