import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { GetUserPermissionProfileContractRouterApiGateway } from '../../domain/gateways/get-user-permission-profiles-contracts-router-api.gateway'
import type { UserPermissionProfileContractInterface } from '@/modules/users/domain/interfaces/user-permission-profile-contract.interface'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'

export class GetUserPermissionProfileContractRouterApiService
  implements GetUserPermissionProfileContractRouterApiGateway
{
  constructor(private readonly executeRequest: ExecuteRequest) {}
  getHttpRequestConfig(
    userId: UserEntity['id'],
    userPermissionProfileId: PermissionProfileInterface['id']
  ): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/user/${userId}/permission-profile/${userPermissionProfileId}/contract`
    }
  }

  async execute(
    userId: UserEntity['id'],
    userPermissionProfileId: PermissionProfileInterface['id']
  ): Promise<UserPermissionProfileContractInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      userId,
      userPermissionProfileId
    )
    const { data }: HttpResponse<UserPermissionProfileContractInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return data
  }
}
