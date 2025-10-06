import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'
import { GetPermissionProfilesRouterApiFactory } from '@/modules/api/infrastructure/factories/get-permission-profiles-router-api.factory'
import type { PermissionProfileEntity } from '../../domain/entities/permission-profile.entity'
import { PostPermissionProfileRouterApiFactory } from '@/modules/api/infrastructure/factories/post-permission-profile-router-api.factory'
import { PostFeatureRouterApiFactory } from '@/modules/api/infrastructure/factories/post-feature-router-api.factory'
import { GetPermissionProfileFeatureRouterApiFactory } from '@/modules/api/infrastructure/factories/get-permission-profile-feature-router-api.factory'
import type { PermissionProfileWithFeatureInterface } from '../../domain/interfaces/permission-profile-with-feature.interface'
import type { FeaturesInterface } from '../../domain/interfaces/features.interface'
import { DeleteFeatureRouterApiFactory } from '@/modules/api/infrastructure/factories/delete-feature-router-api.factory'
import type { PermissionProfileAndFeaturesInterface } from '../../domain/interfaces/permission-profile-and-features'
import { PostPermissionProfileAndFeaturesRouterApiFactory } from '@/modules/api/infrastructure/factories/post-permission-profile-and-features-router-api.factory'
import type { PermissionProfileEnableAndDisableInterface } from '../../domain/interfaces/permission-profile-enable-and-disable.interface'
import { PutPermissionProfileStatusRouterApiFactory } from '@/modules/api/infrastructure/factories/put-permission-profile-status-router-api.factory'

type UserState = {
  permissionProfiles: PermissionProfileInterface[]
  permissionProfile: PermissionProfileEntity | null
  features: PermissionProfileWithFeatureInterface[] | []

  getPermissionProfiles: () => Promise<void>

  addPermissionProfile: (
    permissionProfileData: PermissionProfileInterface
  ) => Promise<PermissionProfileInterface>

  addPermissionProfileAndFeatures: (
    permissionProfileAndFeatures: PermissionProfileAndFeaturesInterface
  ) => Promise<void>

  getPermissionProfileFeatures: (
    permissionProfileId: PermissionProfileInterface['id']
  ) => Promise<void>

  addFeatures: (
    features: number[],
    permissionProfileId: PermissionProfileInterface['id']
  ) => Promise<void>

  deleteFeature: (
    featureId: FeaturesInterface['id'],
    permissionProfileId: PermissionProfileInterface['id']
  ) => Promise<void>

  updatePermissionProfileStatus: (
    updatePermissionProfileStatus: PermissionProfileEnableAndDisableInterface
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

  getPermissionProfileFeatures: async (
    permissionProfileId: PermissionProfileInterface['id']
  ) => {
    try {
      const getPermissionProfileFeaturesRouterApiFactory = GetPermissionProfileFeatureRouterApiFactory.create()
      const features =
        await getPermissionProfileFeaturesRouterApiFactory.execute(permissionProfileId)
      set({ features })
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
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  addPermissionProfileAndFeatures: async (
    permissionProfileAndFeatures: PermissionProfileAndFeaturesInterface
  ) => {
    try {
      const postPermissionProfileAndFeaturesRouterApiFactory =
        PostPermissionProfileAndFeaturesRouterApiFactory.create()
      await postPermissionProfileAndFeaturesRouterApiFactory.execute(
        permissionProfileAndFeatures
      )
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  deleteFeature: async (
    featureId: FeaturesInterface['id'],
    permissionProfileId: PermissionProfileInterface['id']
  ) => {
    try {
      const deleteFeatureRouterApiFactory =
        DeleteFeatureRouterApiFactory.create()
      await deleteFeatureRouterApiFactory.execute(
        featureId,
        permissionProfileId
      )
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  updatePermissionProfileStatus: async (
    permissionProfileEnableAndDisable: PermissionProfileEnableAndDisableInterface
  ) => {
    try {
      const putPermissionProfileStatusRouterApiFactory =
        PutPermissionProfileStatusRouterApiFactory.create()
      await putPermissionProfileStatusRouterApiFactory.execute(
        permissionProfileEnableAndDisable
      )
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
