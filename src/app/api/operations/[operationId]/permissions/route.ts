import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import { GetPermissionProfilesFactory } from '@/modules/permissions/infrastructure/factories/get-permission-profiles.factory'
import { PostPermissionProfileFactory } from '@/modules/permissions/infrastructure/factories/post-permission-profile.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

const routerApi = RouterApiFactory.create()

export const POST = routerApi.POST<UrlParams>(async ({ operationId }, req) => {
  const permissionProfile = await req?.json()
  const postPermissionProfile = PostPermissionProfileFactory.create({
    operationId
  })
  return await postPermissionProfile.execute(permissionProfile)
})

export const GET = routerApi.GET<UrlParams, PermissionProfileInterface[]>(
  async ({ operationId }) => {
    const getPermissionProfiles = GetPermissionProfilesFactory.create({
      operationId
    })
    return await getPermissionProfiles.execute()
  }
)
