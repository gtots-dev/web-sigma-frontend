import type { RouterApiGateway } from '../../domain/interfaces/router-api.gateway'
import { RouterApiService } from '../services/router-service-api.service'

export class RouterApiFactory {
  static create(): RouterApiGateway {
    return new RouterApiService()
  }
}
