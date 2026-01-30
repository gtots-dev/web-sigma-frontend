import type { RouterApiGateway } from '../../domain/interfaces/router-api-service.interface'
import { RouterApiService } from '../router-api/router-api.service'

export class RouterApiFactory {
  static create(): RouterApiGateway {
    return new RouterApiService()
  }
}
