import { JwtTokenDecode } from '@/modules/shared/infrastructure/jwt/jwt-decode'
import type { JwtDecodeInterface } from '../../domain/interfaces/jwt-decode.interface'

export class JwtTokenDecodeFactory {
  private static instance: JwtTokenDecode | null = null

  static create(): JwtDecodeInterface {
    if (!this.instance) {
      this.instance = new JwtTokenDecode()
    }
    return this.instance
  }
}
