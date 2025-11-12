import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { GetUserPermissionProfileContractFactory } from '@/modules/users/infrastructure/factories/get-user-permission-profiles-contract.factory'
import type { UserPermissionProfileContractInterface } from '@/modules/users/domain/interfaces/user-permission-profile-contract.interface'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<
  UrlParams,
  UserPermissionProfileContractInterface[]
>(async ({ operationId, userId, permissionProfileId }) => {
  const getUserPermissionProfileContract =
    GetUserPermissionProfileContractFactory.create({
      operationId,
      userId,
      permissionProfileId
    })
  const response = await getUserPermissionProfileContract.execute()
  return { data: response, status: HttpStatusCodeEnum.OK }
})
