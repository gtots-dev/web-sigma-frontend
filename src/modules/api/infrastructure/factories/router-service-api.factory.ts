import type { RouterApiServiceInterface } from '../../domain/interfaces/router-api-service.interface'
import { RouterApiService } from '../services/router-service-api.service'

export class RouterApiFactory {
  static create(): RouterApiServiceInterface {
    return new RouterApiService()
  }
}
