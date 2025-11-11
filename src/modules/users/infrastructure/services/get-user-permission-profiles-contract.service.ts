import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UserPermissionProfileContractInterface } from '../../domain/interfaces/user-permission-profile-contract.interface'
import type { GetUserPermissionProfileContractGateway } from '../../domain/gateways/get-user-permission-profiles-contract.gateway'
import type { UserEntity } from '../../domain/entities/user.entity'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'

export class GetUserPermissionProfileContractService
  implements GetUserPermissionProfileContractGateway
{
  constructor(private readonly httpRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    token: TokenEntities,
    userId: UserEntity['id'],
    userPermissionProfileId: PermissionProfileInterface['id']
  ): HttpRequestConfig {
    return {
      method: 'GET',
      url: `/users/${userId}/perm-profiles/${userPermissionProfileId}/contracts`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    userId: UserEntity['id'],
    userPermissionProfileId: PermissionProfileInterface['id']
  ): Promise<UserPermissionProfileContractInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      token,
      userId,
      userPermissionProfileId
    )
    const { data }: HttpResponse<UserPermissionProfileContractInterface[]> =
      await this.httpRequest.execute(settingsAuthHTTP)
    return data
  }
}
