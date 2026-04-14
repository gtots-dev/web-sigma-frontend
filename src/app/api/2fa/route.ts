import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import { PostTwoFactorFactory } from '@/modules/two-factor/infrastructure/factories/post-two-factor.factory'

const routerApi = RouterApiFactory.create()

export const POST = routerApi.POST<void>(async () => {
  const postTwoFactor = PostTwoFactorFactory.create()
  return await postTwoFactor.execute()
})
