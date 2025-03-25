import { JwtTokenVerifier } from "@/modules/shared/infrastructure/jwt/jwt-verifier"
import { JwtValidator } from "../../domain/validators/jwt.validator"

export class JwtValidatorFactory {
  private static instance: JwtValidator | null = null

  static create(secret: string): JwtValidator {
    if (!this.instance) {
      const jwtVerifier = new JwtTokenVerifier()
      this.instance = new JwtValidator(jwtVerifier, secret)
    }
    return this.instance
  }
}
