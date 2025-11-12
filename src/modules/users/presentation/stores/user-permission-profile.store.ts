import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { PermissionProfileWithUserInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-user.interface'
import { GetUserWithPermissionProfileRouterApiFactory } from '@/modules/api/infrastructure/factories/get-user-with-permission-profile-router-api.factory'
import { PostBindUserWithPermissionProfileRouterApiFactory } from '@/modules/api/infrastructure/factories/post-bind-user-with-permission-profile-router-api.factory'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import { DeleteBindUserWithPermissionProfileRouterApiFactory } from '@/modules/api/infrastructure/factories/delete-bind-user-with-permission-profile-router-api.factory'
import type { UserPermissionProfileContractInterface } from '../../domain/interfaces/user-permission-profile-contract.interface'
import { GetUserPermissionProfileContractRouterApiFactory } from '@/modules/api/infrastructure/factories/get-user-permission-profiles-contract-router-api.factory'
import { PutUserPermissionProfileAllInOneRouterApiFactory } from '@/modules/api/infrastructure/factories/put-user-permission-profile-all-in-one-router-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { UserPermissionProfileWithFeaturesAndContractsInterface } from '../../domain/interfaces/user-permission-profile-with-features-and-contracts.interface'

type PermissionProfileWithUserState = {
  userWithPermissionProfiles: PermissionProfileWithUserInterface[]
  userPermissionProfilesContract: UserPermissionProfileContractInterface[]
  getUserWithPermissionProfiles: ({
    operationId,
    userId
  }: UrlParams) => Promise<PermissionProfileWithUserInterface[]>
  bindUserWithPermissionProfile: (
    { operationId, userId }: UrlParams,
    permissionProfilesIds: PermissionProfileEntity['id'][]
  ) => Promise<void>
  putUserPermissionProfileAllInOne: (
    { operationId, userId }: UrlParams,
    profiles: UserPermissionProfileWithFeaturesAndContractsInterface
  ) => Promise<void>
  deleteBindUserWithPermissionProfile: ({
    operationId,
    userId,
    permissionProfileId
  }: UrlParams) => Promise<void>
  getUserPermissionProfilesContract: ({
    operationId,
    userId,
    permissionProfileId
  }: UrlParams) => Promise<UserPermissionProfileContractInterface[]>
  clearUserPermissionProfilesContract: () => void
}

export const usePermissionProfileWithUserStore =
  create<PermissionProfileWithUserState>((set) => ({
    userWithPermissionProfiles: [],
    userPermissionProfilesContract: [],

    getUserWithPermissionProfiles: async ({
      operationId,
      userId
    }: UrlParams) => {
      try {
        const getUserWithPermissionProfileRouterApiFactory =
          GetUserWithPermissionProfileRouterApiFactory.create({
            operationId,
            userId
          })
        const userWithPermissionProfiles =
          await getUserWithPermissionProfileRouterApiFactory.execute()
        set({ userWithPermissionProfiles })
        return userWithPermissionProfiles
      } catch (error) {
        if (error instanceof HttpResponseError) {
          throw error
        }
      }
    },

    bindUserWithPermissionProfile: async (
      { operationId, userId }: UrlParams,
      permissionProfilesIds: PermissionProfileEntity['id'][]
    ) => {
      try {
        const postBindUserWithPermissionProfileRouterApiFactory =
          PostBindUserWithPermissionProfileRouterApiFactory.create({
            operationId,
            userId
          })
        await postBindUserWithPermissionProfileRouterApiFactory.execute(
          permissionProfilesIds
        )
      } catch (error) {
        if (error instanceof HttpResponseError) {
          throw error
        }
      }
    },

    deleteBindUserWithPermissionProfile: async ({
      operationId,
      userId,
      permissionProfileId
    }: UrlParams) => {
      try {
        const deleteBindUserWithPermissionProfileRouterApiFactory =
          DeleteBindUserWithPermissionProfileRouterApiFactory.create({
            operationId,
            userId,
            permissionProfileId
          })
        await deleteBindUserWithPermissionProfileRouterApiFactory.execute()
      } catch (error) {
        if (error instanceof HttpResponseError) {
          throw error
        }
      }
    },

    putUserPermissionProfileAllInOne: async (
      { operationId, userId }: UrlParams,
      profiles: UserPermissionProfileWithFeaturesAndContractsInterface
    ) => {
      const putUserPermissionProfileAllInOneRouterApiFactory =
        PutUserPermissionProfileAllInOneRouterApiFactory.create({
          userId,
          operationId
        })
      await putUserPermissionProfileAllInOneRouterApiFactory.execute(profiles)
    },

    getUserPermissionProfilesContract: async ({
      operationId,
      userId,
      permissionProfileId
    }: UrlParams) => {
      try {
        const getUserPermissionProfileContractRouterApiFactory =
          GetUserPermissionProfileContractRouterApiFactory.create({
            operationId,
            userId,
            permissionProfileId
          })

        const newContracts =
          await getUserPermissionProfileContractRouterApiFactory.execute()

        set((state) => {
          const allContracts = [
            ...state.userPermissionProfilesContract,
            ...newContracts
          ]

          const uniqueContracts = allContracts.reduce<
            UserPermissionProfileContractInterface[]
          >((acc, c) => {
            const exists = acc.some(
              (item) =>
                item.user_perm_profile_id === c.user_perm_profile_id &&
                item.contract_id === c.contract_id
            )
            if (!exists) acc.push(c)
            return acc
          }, [])

          return { userPermissionProfilesContract: uniqueContracts }
        })

        return newContracts
      } catch (error) {
        if (error instanceof HttpResponseError) {
          throw error
        }
      }
    },

    clearUserPermissionProfilesContract: () => {
      set({ userPermissionProfilesContract: [] })
    }
  }))
