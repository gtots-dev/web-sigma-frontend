import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { PatchGroupStatusFactory } from '@/modules/groups/infrastructure/factories/patch-group-status.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

const routerApi = RouterApiFactory.create()

export const PATCH = routerApi.PATCH<UrlParams>(
  async ({ operationId, contractId, groupId }, req) => {
    const groupEnableAndDisabled = await req?.json()
    const patchGroupStatus = PatchGroupStatusFactory.create({
      operationId,
      contractId,
      groupId
    })
    await patchGroupStatus.execute(groupEnableAndDisabled)
    return {
      data: { success: true },
      status: HttpStatusCodeEnum.OK
    }
  }
)
