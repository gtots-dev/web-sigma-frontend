import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import { applySetCookie } from '@/modules/shared/infrastructure/cookies/service/apply-set-cookie.service'
import { PostTwoFactorVerifyFactory } from '@/modules/two-factor/infrastructure/factories/post-two-factor-verify.factory'

const routerApi = RouterApiFactory.create()

export const POST = routerApi.POST<void>(async (_, req) => {
  const code = await req?.json()
  const postTwoFactorVerify = PostTwoFactorVerifyFactory.create()
  const response = await postTwoFactorVerify.execute(code)
  await applySetCookie(response.headers['set-cookie'])
  return response
})
