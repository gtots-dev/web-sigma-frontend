import type { JwtDecodeDataInterface } from '../interfaces/jwt-decode-data.interface'

export interface JwtDecodeGateway {
  decode(token: string): JwtDecodeDataInterface
}
