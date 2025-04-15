import type { JwtDecodeDataInterface } from '@/modules/shared/domain/interfaces/jwt-decode-data.interface'
import type { JwtDecodeInterface } from '@/modules/shared/domain/interfaces/jwt-decode.interface'
import jwt from 'jsonwebtoken'

export class JwtTokenDecode implements JwtDecodeInterface {
  decode(token: string) {
    return jwt.decode(token) as JwtDecodeDataInterface
  }
}
