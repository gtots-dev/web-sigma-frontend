import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UserPasswordResetInterface } from '../../domain/interfaces/user-password-reset.interface'
import { PostUserPasswordResetRouterApiFactory } from '@/modules/api/infrastructure/factories/post-user-password-reset-router-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

type UserPasswordResetState = {
  solicitedNewPassword: (
    { operationId }: UrlParams,
    userPasswordReset: UserPasswordResetInterface
  ) => Promise<void>
}

export const useUserPasswordResetStore = create<UserPasswordResetState>(() => ({
  solicitedNewPassword: async (
    { operationId }: UrlParams,
    userPasswordReset: UserPasswordResetInterface
  ) => {
    try {
      const postUserPasswordResetRouterApiFactory =
        PostUserPasswordResetRouterApiFactory.create({ operationId })
      await postUserPasswordResetRouterApiFactory.execute(userPasswordReset)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
