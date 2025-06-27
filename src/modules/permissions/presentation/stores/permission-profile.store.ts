import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'
import { GetPermissionProfilesRouterApiFactory } from '@/modules/api/infrastructure/factories/get-permission-profiles-router-api.factory'
import type { PermissionProfileEntity } from '../../domain/entities/permission-profile.entity'
import { PostPermissionProfileRouterApiFactory } from '@/modules/api/infrastructure/factories/post-permission-profile-router-api.factory'
import { PostFeatureRouterApiFactory } from '@/modules/api/infrastructure/factories/post-feature-router-api.factory'

type UserState = {
  permissionProfiles: PermissionProfileInterface[]
  permissionProfile: PermissionProfileEntity | null
  features: number[] | []
  getPermissionProfiles: () => Promise<void>
  addPermissionProfile: (
    permissionProfileData: PermissionProfileInterface
  ) => Promise<PermissionProfileInterface>
  addFeatures: (
    features: number[],
    permissionProfileId: PermissionProfileInterface['id']
  ) => Promise<void>
}

export const usePermissionProfileStore = create<UserState>((set) => ({
  permissionProfiles: [],
  permissionProfile: null,
  features: [],

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
      return permissionProfile
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  addFeatures: async (
    features: number[],
    permissionProfileId: PermissionProfileInterface['id']
  ) => {
    try {
      const postFeatureRouterApiFactory = PostFeatureRouterApiFactory.create()
      await postFeatureRouterApiFactory.execute(features, permissionProfileId)
      set({ features })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
