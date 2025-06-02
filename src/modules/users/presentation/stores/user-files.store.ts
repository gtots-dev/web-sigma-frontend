import { create } from 'zustand'
import type { UserFileInterface } from '../../domain/interfaces/user-file.interface'
import { GetUserFilesRouterApiFactory } from '@/modules/api/infrastructure/factories/get-user-files-router-api.factory'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UserEntity } from '../../domain/entities/user.entity'

type UserFilesState = {
  files: UserFileInterface[]
  getUserFiles: (userId: UserEntity['id']) => Promise<void>
}

export const useUserFilesStore = create<UserFilesState>((set) => ({
  files: [],

  getUserFiles: async (userId: UserEntity['id']) => {
    try {
      const getUsersRouterApiFactory = GetUserFilesRouterApiFactory.create()
      const files = await getUsersRouterApiFactory.execute(userId)
      set({ files })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
