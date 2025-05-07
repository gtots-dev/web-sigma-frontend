import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { TokenService } from '../services/token.service'
import { JwtValidatorFactory } from '@/modules/shared/infrastructure/factories/jwt-validator.factory'
import type { TokenServiceInterface } from '../../domain/interfaces/token-service.interface'

export class TokenFactory {
  static create(): TokenServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const tokenValidator = JwtValidatorFactory.create(
      process.env.SECRET_KEY_ACCESS_TOKEN
    )
    return new TokenService(executeRequest, tokenValidator)
  }
}
