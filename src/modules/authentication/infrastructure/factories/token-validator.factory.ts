import { JwtTokenVerifier } from "@/modules/shared/infrastructure/jwt/jwt-verifier"
import { TokenValidator } from "../../domain/validators/token.validator"

export class TokenValidatorFactory {
  private static instance: TokenValidator | null = null

  static create(secret: string): TokenValidator {
    if (!this.instance) {
      const tokenVerifier = new JwtTokenVerifier()
      this.instance = new TokenValidator(tokenVerifier, secret)
    }
    return this.instance
  }
}
