import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'
import { GetPermissionProfilesRouterApiFactory } from '@/modules/api/infrastructure/factories/get-permission-profiles-router-api.factory'
import type { PermissionProfileEntity } from '../../domain/entities/permission-profile.entity'
import { PostPermissionProfileRouterApiFactory } from '@/modules/api/infrastructure/factories/post-permission-profile-router-api.factory'
import { PostFeatureRouterApiFactory } from '@/modules/api/infrastructure/factories/post-feature-router-api.factory'
import { GetPermissionProfileFeatureRouterApiFactory } from '@/modules/api/infrastructure/factories/get-permission-profile-feature-router-api.factory'
import type { PermissionProfileWithFeatureInterface } from '../../domain/interfaces/permission-profile-with-feature.interface'
import { DeleteFeatureRouterApiFactory } from '@/modules/api/infrastructure/factories/delete-feature-router-api.factory'
import type { PermissionProfileAndFeaturesInterface } from '../../domain/interfaces/permission-profile-and-features'
import { PostPermissionProfileAndFeaturesRouterApiFactory } from '@/modules/api/infrastructure/factories/post-permission-profile-and-features-router-api.factory'
import type { PermissionProfileEnableAndDisableInterface } from '../../domain/interfaces/permission-profile-enable-and-disable.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PatchPermissionProfileStatusRouterApiFactory } from '@/modules/api/infrastructure/factories/put-permission-profile-status-router-api.factory'

type PermissionsState = {
  permissionProfiles: PermissionProfileInterface[]
  permissionProfile: PermissionProfileEntity | null
  features: PermissionProfileWithFeatureInterface[] | []

  getPermissionProfiles: ({ operationId }: UrlParams) => Promise<void>

  addPermissionProfile: (
    { operationId }: UrlParams,
    permissionProfileData: PermissionProfileInterface
  ) => Promise<PermissionProfileInterface>

  addPermissionProfileAndFeatures: (
    { operationId }: UrlParams,
    permissionProfileAndFeatures: PermissionProfileAndFeaturesInterface
  ) => Promise<void>

  getPermissionProfileFeatures: ({
    operationId,
    permissionProfileId
  }: UrlParams) => Promise<void>

  addFeatures: (
    features: number[],
    { operationId, permissionProfileId }: UrlParams
  ) => Promise<void>

  deleteFeature: ({
    operationId,
    permissionProfileId,
    featureId
  }: UrlParams) => Promise<void>

  updatePermissionProfileStatus: (
    { operationId, permissionProfileId }: UrlParams,
    updatePermissionProfileStatus: PermissionProfileEnableAndDisableInterface
  ) => Promise<void>
}

export const usePermissionProfileStore = create<PermissionsState>((set) => ({
  permissionProfiles: [],
  permissionProfile: null,
  features: [],

  getPermissionProfiles: async ({ operationId }: UrlParams) => {
    try {
      const getPermissionProfilesRouterApiFactory =
        GetPermissionProfilesRouterApiFactory.create({ operationId })
      const { data: permissionProfiles } =
        await getPermissionProfilesRouterApiFactory.execute()
      set({ permissionProfiles })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  addPermissionProfile: async (
    { operationId }: UrlParams,
    permissionProfileData: PermissionProfileInterface
  ) => {
    try {
      const postPermissionProfilesRouterApiFactory =
        PostPermissionProfileRouterApiFactory.create({ operationId })
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

  getPermissionProfileFeatures: async ({
    operationId,
    permissionProfileId
  }: UrlParams) => {
    try {
      const getPermissionProfileFeaturesRouterApiFactory =
        GetPermissionProfileFeatureRouterApiFactory.create({
          operationId,
          permissionProfileId
        })
      const { data: features } =
        await getPermissionProfileFeaturesRouterApiFactory.execute()
      set({ features })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  addFeatures: async (
    features: number[],
    { operationId, permissionProfileId }: UrlParams
  ) => {
    try {
      const postFeatureRouterApiFactory = PostFeatureRouterApiFactory.create({
        operationId,
        permissionProfileId
      })
      await postFeatureRouterApiFactory.execute(features)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  addPermissionProfileAndFeatures: async (
    { operationId }: UrlParams,
    permissionProfileAndFeatures: PermissionProfileAndFeaturesInterface
  ) => {
    try {
      const postPermissionProfileAndFeaturesRouterApiFactory =
        PostPermissionProfileAndFeaturesRouterApiFactory.create({
          operationId
        })
      await postPermissionProfileAndFeaturesRouterApiFactory.execute(
        permissionProfileAndFeatures
      )
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  deleteFeature: async ({
    operationId,
    permissionProfileId,
    featureId
  }: UrlParams) => {
    try {
      const deleteFeatureRouterApiFactory =
        DeleteFeatureRouterApiFactory.create({
          featureId,
          permissionProfileId,
          operationId
        })
      await deleteFeatureRouterApiFactory.execute()
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  updatePermissionProfileStatus: async (
    { operationId, permissionProfileId }: UrlParams,
    permissionProfileEnableAndDisable: PermissionProfileEnableAndDisableInterface
  ) => {
    try {
      const patchPermissionProfileStatusRouterApiFactory =
        PatchPermissionProfileStatusRouterApiFactory.create({
          operationId,
          permissionProfileId
        })
      await patchPermissionProfileStatusRouterApiFactory.execute(
        permissionProfileEnableAndDisable
      )
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
