import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import { PostTwoFactorVerifyFactory } from '@/modules/two-factor/infrastructure/factories/post-two-factor-verify.factory'

const routerApi = RouterApiFactory.create()

export const POST = routerApi.POST<void>(async (_, req) => {
  const postTwoFactorVerify = PostTwoFactorVerifyFactory.create()
  const code = await req?.json()
  return await postTwoFactorVerify.execute(code)
})
