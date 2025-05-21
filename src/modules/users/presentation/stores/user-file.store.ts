import { create } from 'zustand'
import { GetUserFileRouterApiFactory } from '@/modules/api/infrastructure/factories/get-user-file-router-api.factory'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UserEntity } from '../../domain/entities/user.entity'
import type { UserFileInterface } from '../../domain/interfaces/user-file.interface'

type UserFileState = {
  getUserFile: (
    userId: UserEntity['id'],
    fileId: UserFileInterface['id']
  ) => Promise<Blob>
}

export const useUserFileStore = create<UserFileState>(() => ({
  getUserFile: async (
    userId: UserEntity['id'],
    fileId: UserFileInterface['id']
  ) => {
    try {
      const getUsersRouterApiFactory = GetUserFileRouterApiFactory.create()
      return await getUsersRouterApiFactory.execute(userId, fileId)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
