import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PutUserPermissionProfileAllInOneRouterApiServiceInterface } from '../../domain/interfaces/put-user-permission-profiles-all-in-one-router-api-service.interface'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'

export class PutUserPermissionProfileAllInOneRouterApiService
  implements PutUserPermissionProfileAllInOneRouterApiServiceInterface
{
  constructor(private readonly httpRequest: ExecuteRequest) {}
  getHttpRequestConfig(
    userId: UserEntity['id'],
    profiles: {
      profiles: {
        perm_profile_id: PermissionProfileEntity['id']
        contract_ids: ContractEntity['id'][]
      }[]
    }
  ): HttpRequestConfig {
    return {
      method: 'PUT',
      data: profiles,
      url: `api/user/${userId}/permission-profile/all-in-one`
    }
  }
  async execute(
    userId: UserEntity['id'],
    profiles: {
      profiles: {
        perm_profile_id: PermissionProfileEntity['id']
        contract_ids: ContractEntity['id'][]
      }[]
    }
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(userId, profiles)
    await this.httpRequest.execute(settingsAuthHTTP)
  }
}
