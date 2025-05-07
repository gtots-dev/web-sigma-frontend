import { GetUsersRouterApiFactory } from '@/modules/api/infrastructure/factories/get-users-router-api.factory'
import { create } from 'zustand'
import type { UserEntity } from '../../domain/entities/user.entity'
import { PutUserRouterApiFactory } from '@/modules/api/infrastructure/factories/put-user-router-api.factory'
import { PostUserRouterApiFactory } from '@/modules/api/infrastructure/factories/post-user-router-api.factory'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UserWithFiles } from '../../domain/types/user-with-files'

type UserState = {
  users: UserEntity[]
  getUsers: () => Promise<void>
  addUser: (user: Omit<UserWithFiles, 'id'>) => Promise<void>
  updateUser: (user: UserWithFiles) => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
  users: [],

  getUsers: async () => {
    try {
      const getUsersRouterApiFactory = GetUsersRouterApiFactory.create()
      const users = await getUsersRouterApiFactory.execute()
      set({ users })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  addUser: async (user: UserWithFiles) => {
    try {
      const postUsersRouterApiFactory = PostUserRouterApiFactory.create()
      await postUsersRouterApiFactory.execute(user)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  updateUser: async (user: UserWithFiles) => {
    try {
      const putUsersRouterApiFactory = PutUserRouterApiFactory.create()
      await putUsersRouterApiFactory.execute(user)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
