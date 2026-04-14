import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { TwoFactorInterface } from '../../domain/interfaces/two-factor.interface'
import { PostTwoFactorVerifyRouterApiFactory } from '@/modules/api/infrastructure/factories/post-two-factor-verify-router-api.factory'
import { PostTwoFactorRouterApiFactory } from '@/modules/api/infrastructure/factories/post-two-factor-router-api.factory'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { OAuthResponseInterface } from '@/modules/authentication/domain/interfaces/o-auth-response.interface'

type TwoFactorState = {
  postTwoFactorVerify: (
    twoFactor: TwoFactorInterface
  ) => Promise<HttpResponseInterface<OAuthResponseInterface>>
  postTwoFactor: () => Promise<void>
}

export const useTwoFactorStore = create<TwoFactorState>(() => ({
  postTwoFactorVerify: async (twoFactor: TwoFactorInterface) => {
    try {
      const postTwoFactorVerifyRouterApiFactory =
        PostTwoFactorVerifyRouterApiFactory.create()
      return await postTwoFactorVerifyRouterApiFactory.execute(twoFactor)
    } catch (error) {
      if (error instanceof HttpResponseError) throw error
    }
  },

  postTwoFactor: async () => {
    try {
      const postTwoFactorRouterApiFactory =
        PostTwoFactorRouterApiFactory.create()
      return await postTwoFactorRouterApiFactory.execute()
    } catch (error) {
      if (error instanceof HttpResponseError) throw error
    }
  }
}))
