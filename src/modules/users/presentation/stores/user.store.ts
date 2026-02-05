import { GetUsersRouterApiFactory } from '@/modules/api/infrastructure/factories/get-users-router-api.factory'
import { create } from 'zustand'
import type { UserEntity } from '../../domain/entities/user.entity'
import { PatchUserRouterApiFactory } from '@/modules/api/infrastructure/factories/patch-user-router-api.factory'
import { PostUserRouterApiFactory } from '@/modules/api/infrastructure/factories/post-user-router-api.factory'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UserEnableAndDisableInterface } from '../../domain/interfaces/user-enable-and-disable.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PatchUserStatusRouterApiFactory } from '@/modules/api/infrastructure/factories/patch-user-status-router-api.factory'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

type UserState = {
  users: UserEntity[]
  getUsers: ({ operationId }: UrlParams) => Promise<void>
  addUser: (
    { operationId }: UrlParams,
    user: UserEntity
  ) => Promise<HttpResponseInterface<UserEntity>>
  patchUser: (
    { operationId, userId }: UrlParams,
    user: UserEntity
  ) => Promise<void>
  updateUserStatus: (
    { operationId }: UrlParams,
    userEnableAndDisable: UserEnableAndDisableInterface
  ) => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
  users: [],

  getUsers: async ({ operationId }: UrlParams) => {
    try {
      const getUsersRouterApiFactory = GetUsersRouterApiFactory.create({
        operationId
      })
      const { data: users } = await getUsersRouterApiFactory.execute()
      set({ users })
    } catch (error) {
      if (error instanceof HttpResponseError) throw error
    }
  },

  addUser: async ({ operationId }: UrlParams, user: UserEntity) => {
    try {
      const postUsersRouterApiFactory = PostUserRouterApiFactory.create({
        operationId
      })
      return await postUsersRouterApiFactory.execute(user)
    } catch (error) {
      if (error instanceof HttpResponseError) throw error
    }
  },

  patchUser: async ({ operationId, userId }: UrlParams, user: UserEntity) => {
    try {
      const patchUsersRouterApiFactory = PatchUserRouterApiFactory.create({
        operationId,
        userId
      })
      await patchUsersRouterApiFactory.execute(user)
    } catch (error) {
      if (error instanceof HttpResponseError) throw error
    }
  },

  updateUserStatus: async (
    { operationId }: UrlParams,
    userEnableAndDisable: UserEnableAndDisableInterface
  ) => {
    try {
      const putUserStatusRouterApiFactory =
        PatchUserStatusRouterApiFactory.create({ operationId })
      await putUserStatusRouterApiFactory.execute(userEnableAndDisable)
    } catch (error) {
      if (error instanceof HttpResponseError) throw error
    }
  }
}))
