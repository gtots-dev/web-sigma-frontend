import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { PermissionProfileWithUserInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-user.interface'
import { GetUserWithPermissionProfileRouterApiFactory } from '@/modules/api/infrastructure/factories/get-user-with-permission-profile-router-api.factory'
import type { UserEntity } from '../../domain/entities/user.entity'
import { PostBindUserWithPermissionProfileRouterApiFactory } from '@/modules/api/infrastructure/factories/post-bind-user-with-permission-profile-router-api.factory'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import { DeleteBindUserWithPermissionProfileRouterApiFactory } from '@/modules/api/infrastructure/factories/delete-bind-user-with-permission-profile-router-api.factory'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import type { UserPermissionProfileContractInterface } from '../../domain/interfaces/user-permission-profile-contract.interface'
import { GetUserPermissionProfileContractRouterApiFactory } from '@/modules/api/infrastructure/factories/get-user-permission-profiles-contract-router-api.factory'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import { PutUserPermissionProfileAllInOneRouterApiFactory } from '@/modules/api/infrastructure/factories/put-user-permission-profile-all-in-one-router-api.factory'

type PermissionProfileWithUserState = {
  userWithPermissionProfiles: PermissionProfileWithUserInterface[]
  userPermissionProfilesContract: UserPermissionProfileContractInterface[]
  getUserWithPermissionProfiles: (
    userId: UserEntity['id']
  ) => Promise<PermissionProfileWithUserInterface[]>
  bindUserWithPermissionProfile: (
    permissionProfilesIds: PermissionProfileEntity['id'][],
    userId: UserEntity['id']
  ) => Promise<void>
  putUserPermissionProfileAllInOne: (
    userId: UserEntity['id'],
    profiles: {
      profiles: {
        perm_profile_id: PermissionProfileEntity['id']
        contract_ids: ContractEntity['id'][]
      }[]
    }
  ) => Promise<void>
  deleteBindUserWithPermissionProfile: (
    permissionProfilesId: PermissionProfileEntity['id'],
    userId: UserEntity['id']
  ) => Promise<void>
  getUserPermissionProfilesContract: (
    userId: UserEntity['id'],
    userPermissionProfileId: PermissionProfileInterface['id']
  ) => Promise<UserPermissionProfileContractInterface[]>
  clearUserPermissionProfilesContract: () => void
}

export const usePermissionProfileWithUserStore =
  create<PermissionProfileWithUserState>((set) => ({
    userWithPermissionProfiles: [],
    userPermissionProfilesContract: [],

    getUserWithPermissionProfiles: async (userId: UserEntity['id']) => {
      try {
        const getUserWithPermissionProfileRouterApiFactory =
          GetUserWithPermissionProfileRouterApiFactory.create()
        const userWithPermissionProfiles =
          await getUserWithPermissionProfileRouterApiFactory.execute(userId)
        set({ userWithPermissionProfiles })
        return userWithPermissionProfiles
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
    },

    deleteBindUserWithPermissionProfile: async (
      permissionProfilesId: PermissionProfileEntity['id'],
      userId: UserEntity['id']
    ) => {
      try {
        const deleteBindUserWithPermissionProfileRouterApiFactory =
          DeleteBindUserWithPermissionProfileRouterApiFactory.create()
        await deleteBindUserWithPermissionProfileRouterApiFactory.execute(
          userId,
          permissionProfilesId
        )
      } catch (error) {
        if (error instanceof HttpResponseError) {
          throw error
        }
      }
    },

    putUserPermissionProfileAllInOne: async (
      userId: UserEntity['id'],
      profiles: {
        profiles: {
          perm_profile_id: PermissionProfileEntity['id']
          contract_ids: ContractEntity['id'][]
        }[]
      }
    ) => {
      const putUserPermissionProfileAllInOneRouterApiFactory =
        PutUserPermissionProfileAllInOneRouterApiFactory.create()

      await putUserPermissionProfileAllInOneRouterApiFactory.execute(
        userId,
        profiles
      )
    },

    getUserPermissionProfilesContract: async (
      userId: UserEntity['id'],
      userPermissionProfileId: PermissionProfileInterface['id']
    ) => {
      try {
        const getUserPermissionProfileContractRouterApiFactory =
          GetUserPermissionProfileContractRouterApiFactory.create()

        const newContracts =
          await getUserPermissionProfileContractRouterApiFactory.execute(
            userId,
            userPermissionProfileId
          )

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
