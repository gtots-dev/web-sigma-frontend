import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UserEntity } from '../../domain/entities/user.entity'
import type { PutUserPermissionProfileAllInOneServiceInterface } from '../../domain/interfaces/put-user-permission-profiles-all-in-one-service.interface'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'

export class PutUserPermissionProfileAllInOneService
  implements PutUserPermissionProfileAllInOneServiceInterface
{
  constructor(private readonly httpRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    token: TokenEntities,
    userId: UserEntity['id'],
    profiles: {
      profiles: {
        perm_profile_id: PermissionProfileEntity['id']
        contract_ids: ContractEntity['id'][]
      }[]
    }
  ): HttpRequestConfig {
    console.log(profiles)
    return {
      method: 'PUT',
      url: `/users/${userId}/perm-profiles/all-in-one`,
      data: profiles,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    userId: UserEntity['id'],
    profiles: {
      profiles: {
        perm_profile_id: PermissionProfileEntity['id']
        contract_ids: ContractEntity['id'][]
      }[]
    }
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(token, userId, profiles)
    await this.httpRequest.execute(settingsAuthHTTP)
  }
}
