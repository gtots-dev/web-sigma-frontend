import { JwtTokenDecode } from '@/modules/shared/infrastructure/jwt/jwt-decode'

export class JwtTokenDecodeFactory {
  private static instance: JwtTokenDecode | null = null

  static create(): JwtTokenDecode {
    if (!this.instance) {
      this.instance = new JwtTokenDecode()
    }
    return this.instance
  }
}
