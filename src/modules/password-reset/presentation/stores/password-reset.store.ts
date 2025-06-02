import { create } from 'zustand'
import { PutPasswordResetRouterApiFactory } from '@/modules/api/infrastructure/factories/put-password-reset-router-api.factory'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { PasswordResetInterface } from '../../domain/interfaces/password-reset.interface'

type PasswordResetState = {
  updatePasswordReset: ({
    token,
    newPassword
  }: PasswordResetInterface) => Promise<void>
}

export const usePasswordResetStore = create<PasswordResetState>(() => ({
  updatePasswordReset: async ({
    token,
    newPassword
  }: PasswordResetInterface) => {
    try {
      const putPasswordResetRouterApiFactory =
        PutPasswordResetRouterApiFactory.create()
      await putPasswordResetRouterApiFactory.execute({ token, newPassword })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
