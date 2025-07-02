import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { PermissionProfileWithUserInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-user.interface'
import { GetUserWithPermissionProfileRouterApiFactory } from '@/modules/api/infrastructure/factories/get-user-with-permission-profile-router-api.factory'
import type { UserEntity } from '../../domain/entities/user.entity'
import { PostBindUserWithPermissionProfileRouterApiFactory } from '@/modules/api/infrastructure/factories/post-bind-user-with-permission-profile-router-api.factory'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'

type PermissionProfileWithUserState = {
  userWithPermissionProfiles: PermissionProfileWithUserInterface[]
  getUserWithPermissionProfiles: (userId: UserEntity['id']) => Promise<void>
  bindUserWithPermissionProfile: (
    permissionProfilesIds: PermissionProfileEntity['id'][],
    userId: UserEntity['id']
  ) => Promise<void>
}

export const usePermissionProfileWithUserStore =
  create<PermissionProfileWithUserState>((set) => ({
    userWithPermissionProfiles: [],

    getUserWithPermissionProfiles: async (userId: UserEntity['id']) => {
      try {
        const getUserWithPermissionProfileRouterApiFactory =
          GetUserWithPermissionProfileRouterApiFactory.create()
        const userWithPermissionProfiles =
          await getUserWithPermissionProfileRouterApiFactory.execute(userId)
        set({ userWithPermissionProfiles })
      } catch (error) {
        if (error instanceof HttpResponseError) {
          throw error
        }
      }
    },

    bindUserWithPermissionProfile: async (
      permissionProfilesIds: PermissionProfileEntity['id'][],
      userId: UserEntity['id']
    ) => {
      try {
        const postBindUserWithPermissionProfileRouterApiFactory =
          PostBindUserWithPermissionProfileRouterApiFactory.create()
        await postBindUserWithPermissionProfileRouterApiFactory.execute(
          userId,
          permissionProfilesIds
        )
      } catch (error) {
        if (error instanceof HttpResponseError) {
          throw error
        }
      }
    }
  }))
