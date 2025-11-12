import { create } from 'zustand'
import { GetUserFileRouterApiFactory } from '@/modules/api/infrastructure/factories/get-user-file-router-api.factory'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

type UserFileState = {
  getUserFile: ({ userId, fileId, operationId }: UrlParams) => Promise<File>
}

export const useUserFileStore = create<UserFileState>(() => ({
  getUserFile: async ({ userId, fileId, operationId }: UrlParams) => {
    try {
      const getUsersRouterApiFactory = GetUserFileRouterApiFactory.create({
        userId,
        fileId,
        operationId
      })
      return await getUsersRouterApiFactory.execute()
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
