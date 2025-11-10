import { JwtTokenDecode } from '@/modules/shared/infrastructure/jwt/jwt-decode'
import type { JwtDecodeGateway } from '../../domain/gateways/jwt-decode.interface'

export class JwtTokenDecodeFactory {
  private static instance: JwtTokenDecode | null = null

  static create(): JwtDecodeGateway {
    if (!this.instance) {
      this.instance = new JwtTokenDecode()
    }
    return this.instance
  }
}
