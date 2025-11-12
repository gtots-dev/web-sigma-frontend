import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import type { PermissionProfileWithUserInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-user.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { GetUserWithPermissionProfileFactory } from '@/modules/users/infrastructure/factories/get-user-with-permission-profile.factory'
import { PostBindUserWithPermissionProfileFactory } from '@/modules/users/infrastructure/factories/post-bind-user-with-permission-profile.factory'

const routerApi = RouterApiFactory.create()

export const POST = routerApi.POST<UrlParams>(
  async ({ operationId, userId }, req) => {
    const permissionProfileIds = await req?.json()
    const postBindUserWithPermissionProfile =
      PostBindUserWithPermissionProfileFactory.create({ operationId, userId })
    await postBindUserWithPermissionProfile.execute(permissionProfileIds)
    return { data: { success: true }, status: HttpStatusCodeEnum.OK }
  }
)

export const GET = routerApi.GET<
  UrlParams,
  PermissionProfileWithUserInterface[]
>(async ({ operationId, userId }) => {
  const getUserWithPermissionProfile =
    GetUserWithPermissionProfileFactory.create({
      operationId,
      userId
    })
  const response = await getUserWithPermissionProfile.execute()
  return { data: response, status: HttpStatusCodeEnum.OK }
})
