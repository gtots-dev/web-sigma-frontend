import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PostUserPasswordResetFactory } from '@/modules/users/infrastructure/factories/post-user-password-reset.factory'

const routerApi = RouterApiFactory.create()

export const POST = routerApi.POST<UrlParams>(
  async ({ operationId, userId }, req) => {
    const daysPasswordRegDeadline = await req?.json()
    const postUserPasswordReset = PostUserPasswordResetFactory.create({
      operationId,
      userId
    })
    await postUserPasswordReset.execute(daysPasswordRegDeadline)
    return {
      data: { success: true },
      status: HttpStatusCodeEnum.OK
    }
  }
)
