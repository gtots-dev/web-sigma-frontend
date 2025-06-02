import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UserPasswordResetInterface } from '../../domain/interfaces/user-password-reset.interface'
import { PostUserPasswordResetRouterApiFactory } from '@/modules/api/infrastructure/factories/post-user-password-reset-router-api.factory'

type UserPasswordResetState = {
  solicitedNewPassword: (
    userPasswordReset: UserPasswordResetInterface
  ) => Promise<void>
}

export const useUserPasswordResetStore = create<UserPasswordResetState>(() => ({
  solicitedNewPassword: async (
    userPasswordReset: UserPasswordResetInterface
  ) => {
    try {
      const postUserPasswordResetRouterApiFactory =
        PostUserPasswordResetRouterApiFactory.create()
      await postUserPasswordResetRouterApiFactory.execute(userPasswordReset)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
