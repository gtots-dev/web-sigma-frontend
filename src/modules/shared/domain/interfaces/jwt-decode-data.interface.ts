export interface JwtDecodeDataInterface {
  login_name: string
  id: number
  operation_ids: number[]
  exp: number
  accessToken: string
}