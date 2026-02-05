import { create } from 'zustand'
import type { UserFileInterface } from '../../domain/interfaces/user-file.interface'
import { GetUserFilesRouterApiFactory } from '@/modules/api/infrastructure/factories/get-user-files-router-api.factory'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { UserFilesInterface } from '../../domain/interfaces/user-files.interface'
import { PostUserFilesRouterApiFactory } from '@/modules/api/infrastructure/factories/post-user-files-router-api.factory'

type UserFilesState = {
  files: UserFileInterface[]
  postUserFiles: (
    { userId, operationId }: UrlParams,
    files: UserFilesInterface
  ) => Promise<void>
  getUserFiles: ({ userId, operationId }: UrlParams) => Promise<void>
}

export const useUserFilesStore = create<UserFilesState>((set) => ({
  files: [],

  postUserFiles: async (
    { userId, operationId }: UrlParams,
    files: UserFilesInterface
  ) => {
    try {
      const postUserFilesRouterApiFactory =
        PostUserFilesRouterApiFactory.create({
          userId,
          operationId
        })
      await postUserFilesRouterApiFactory.execute(files)
    } catch (error) {
      if (error instanceof HttpResponseError) throw error
    }
  },

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
