import { create } from 'zustand'
import type { UserFileInterface } from '../../domain/interfaces/user-file.interface'
import { GetUserFilesRouterApiFactory } from '@/modules/api/infrastructure/factories/get-user-files-router-api.factory'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

type UserFilesState = {
  files: UserFileInterface[]
  getUserFiles: ({ userId, operationId }: UrlParams) => Promise<void>
}

export const useUserFilesStore = create<UserFilesState>((set) => ({
  files: [],

  getUserFiles: async ({ userId, operationId }: UrlParams) => {
    try {
      const getUsersRouterApiFactory = GetUserFilesRouterApiFactory.create({
        userId,
        operationId
      })
      const files = await getUsersRouterApiFactory.execute()
      set({ files })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
