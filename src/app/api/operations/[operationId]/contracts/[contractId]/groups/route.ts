import { GetGroupsFactory } from '@/modules/groups/infrastructure/factories/get-groups.factory'
import { PostGroupFactory } from '@/modules/groups/infrastructure/factories/post-group.factory'
import { PatchGroupFactory } from '@/modules/groups/infrastructure/factories/patch-group.factory'
import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GroupWithGroupInterface } from '@/modules/groups/domain/interfaces/group-with-group.interface'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<UrlParams, GroupWithGroupInterface[]>(
  async ({ operationId, contractId }) => {
    const getGroups = GetGroupsFactory.create({ operationId, contractId })
    return await getGroups.execute()
  }
)

export const POST = routerApi.POST<UrlParams>(
  async ({ operationId, contractId }, req) => {
    const group = await req?.json()
    const postGroup = PostGroupFactory.create({ operationId, contractId })
    return await postGroup.execute(group)
  }
)

export const PATCH = routerApi.PATCH<UrlParams>(
  async ({ operationId, contractId }, req) => {
    const group = await req?.json()
    const patchGroup = PatchGroupFactory.create({ operationId, contractId })
    return await patchGroup.execute(group)
  }
)
