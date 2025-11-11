import type { JwtDecodeDataInterface } from '@/modules/shared/domain/interfaces/jwt-decode-data.interface'
import type { JwtDecodeGateway } from '@/modules/shared/domain/gateways/jwt-decode.gateway'
import jwt from 'jsonwebtoken'

export class JwtTokenDecode implements JwtDecodeGateway {
  decode(token: string): JwtDecodeDataInterface {
    return jwt.decode(token) as JwtDecodeDataInterface
  }
}
