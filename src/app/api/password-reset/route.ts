import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import { PutPasswordResetFactory } from '@/modules/password-reset/infrastructure/factories/put-password-reset.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

const routerApi = RouterApiFactory.create()

export const PUT = routerApi.PUT<UrlParams>(async (_, req) => {
  const newPasswordWithToken = await req?.json()
  const putPasswordReset = PutPasswordResetFactory.create()
  return await putPasswordReset.execute(newPasswordWithToken)
})
