import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { DeleteBindUserWithPermissionProfileGateway } from '../../domain/gateways/delete-bind-user-with-permission-profile.gateway'
import { DeleteBindUserWithPermissionProfileService } from '../services/delete-bind-user-with-permission-profile.service'

export class DeleteBindUserWithPermissionProfileFactory {
  static create(): DeleteBindUserWithPermissionProfileGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new DeleteBindUserWithPermissionProfileService(executeRequest)
  }
}
