import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'
import { GetPermissionProfilesRouterApiFactory } from '@/modules/api/infrastructure/factories/get-permission-profiles-router-api.factory'
import type { PermissionProfileEntity } from '../../domain/entities/permission-profile.entity'
import { PostPermissionProfileRouterApiFactory } from '@/modules/api/infrastructure/factories/post-permission-profile-router-api.factory'

type UserState = {
  permissionProfiles: PermissionProfileInterface[]
  permissionProfile: PermissionProfileEntity | null
  getPermissionProfiles: () => Promise<void>
  addPermissionProfile: (
    permissionProfileData: PermissionProfileInterface
  ) => Promise<void>
}

export const usePermissionProfileStore = create<UserState>((set) => ({
  permissionProfiles: [],
  permissionProfile: null,

  getPermissionProfiles: async () => {
    try {
      const getPermissionProfilesRouterApiFactory =
        GetPermissionProfilesRouterApiFactory.create()
      const permissionProfiles =
        await getPermissionProfilesRouterApiFactory.execute()
      set({ permissionProfiles })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  addPermissionProfile: async (
    permissionProfileData: PermissionProfileInterface
  ) => {
    try {
      const postPermissionProfilesRouterApiFactory =
        PostPermissionProfileRouterApiFactory.create()
      const permissionProfile =
        await postPermissionProfilesRouterApiFactory.execute(
          permissionProfileData
        )
      set({ permissionProfile })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
