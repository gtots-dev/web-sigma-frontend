export interface JwtDecodeDataInterface {
  login_name: string,
  id: number,
  operation_ids: Record<string, number>[],
  exp: number,
}