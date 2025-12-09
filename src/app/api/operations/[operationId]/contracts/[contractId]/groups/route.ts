import { GetGroupsFactory } from '@/modules/groups/infrastructure/factories/get-groups.factory'
import { PostGroupFactory } from '@/modules/groups/infrastructure/factories/post-group.factory'
import { PatchGroupFactory } from '@/modules/groups/infrastructure/factories/patch-group.factory'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GroupWithGroupInterface } from '@/modules/groups/domain/interfaces/group-with-group.interface'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<UrlParams, GroupWithGroupInterface[]>(
  async ({ operationId, contractId }) => {
    const getGroups = GetGroupsFactory.create({ operationId, contractId })
    const response = await getGroups.execute()
    return { data: response, status: HttpStatusCodeEnum.OK }
  }
)

export const POST = routerApi.POST<UrlParams>(
  async ({ operationId, contractId }, req) => {
    const group = await req?.json()
    const postGroup = PostGroupFactory.create({ operationId, contractId })
    await postGroup.execute(group)
    return {
      data: { success: true },
      status: HttpStatusCodeEnum.OK
    }
  }
)

export const PATCH = routerApi.PATCH<UrlParams>(
  async ({ operationId, contractId }, req) => {
    const group = await req?.json()
    const patchGroup = PatchGroupFactory.create({ operationId, contractId })
    await patchGroup.execute(group)
    return {
      data: { success: true },
      status: HttpStatusCodeEnum.OK
    }
  }
)
