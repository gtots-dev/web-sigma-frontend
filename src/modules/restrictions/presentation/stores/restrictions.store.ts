import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { RestrictionEntity } from '../../domain/entities/restriction.entity'
import { GetRestrictionsRouterApiFactory } from '@/modules/api/infrastructure/factories/get-restrictions-router-api.factory'
import { PostRestrictionRouterApiFactory } from '@/modules/api/infrastructure/factories/post-restriction-router-api.factory'
import { PatchRestrictionRouterApiFactory } from '@/modules/api/infrastructure/factories/patch-restriction-router-api.factory'

type RestrictionState = {
  restrictions: RestrictionEntity[]
  loading: boolean
  getRestrictions: ({ operationId, contractId }: UrlParams) => Promise<void>
  postRestriction: (
    { operationId, contractId }: UrlParams,
    restriction: RestrictionEntity
  ) => Promise<void>
  patchRestriction: (
    { operationId, contractId, restrictionId }: UrlParams,
    restriction: RestrictionEntity
  ) => Promise<void>
}

export const useRestrictionStore = create<RestrictionState>((set) => ({
  restrictions: [],
  loading: false,

  getRestrictions: async ({ operationId, contractId }: UrlParams) => {
    set({ loading: true })
    try {
      const getRestrictionsService = GetRestrictionsRouterApiFactory.create({
        operationId,
        contractId
      })
      const { data: restrictions } = await getRestrictionsService.execute()
      set({ restrictions })
    } catch (error) {
      if (error instanceof HttpResponseError) throw error
    } finally {
      set({ loading: false })
    }
  },

  postRestriction: async (
    { operationId, contractId }: UrlParams,
    restriction: RestrictionEntity
  ) => {
    try {
      const postRestrictionRouterApiFactory =
        PostRestrictionRouterApiFactory.create({
          operationId,
          contractId
        })
      await postRestrictionRouterApiFactory.execute(restriction)
    } catch (error) {
      if (error instanceof HttpResponseError) throw error
    }
  },

  patchRestriction: async (
    { operationId, contractId, restrictionId }: UrlParams,
    restriction: RestrictionEntity
  ) => {
    try {
      const patchRestrictionRouterApiFactory =
        PatchRestrictionRouterApiFactory.create({
          operationId,
          contractId,
          restrictionId
        })
      await patchRestrictionRouterApiFactory.execute(restriction)
    } catch (error) {
      if (error instanceof HttpResponseError) throw error
    }
  }
}))
