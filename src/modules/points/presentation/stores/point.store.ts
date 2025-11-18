import { create } from 'zustand'
import type { PointEntity } from '../../domain/entities/point.entity'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { PostPointRouterApiFactory } from '@/modules/api/infrastructure/factories/post-point-router-api.factory'
import { GetPointsRouterApiFactory } from '@/modules/api/infrastructure/factories/get-points-router-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PatchPointRouterApiFactory } from '@/modules/api/infrastructure/factories/patch-point-router-api.factory'
import type { PointEnableAndDisableInterface } from '../../domain/interfaces/point-enable-and-disable.interface'
import { PatchPointStatusRouterApiFactory } from '@/modules/api/infrastructure/factories/patch-point-status-router-api.factory'

type PointState = {
  points: PointEntity[]
  getPoints: ({ operationId, contractId }: UrlParams) => Promise<void>
  addPoint: (
    { operationId, contractId }: UrlParams,
    point: PointEntity
  ) => Promise<void>
  patchPoint: (
    { operationId, contractId }: UrlParams,
    point: PointEntity
  ) => Promise<void>
  patchPointStatus: (
    { operationId, contractId }: UrlParams,
    point: PointEnableAndDisableInterface
  ) => Promise<void>
}

export const usePointStore = create<PointState>((set) => ({
  points: [],

  addPoint: async (
    { operationId, contractId }: UrlParams,
    point: PointEntity
  ) => {
    try {
      const postPointRouterApiFactory = PostPointRouterApiFactory.create({
        operationId,
        contractId
      })
      await postPointRouterApiFactory.execute(point)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  getPoints: async ({ operationId, contractId }: UrlParams) => {
    try {
      const getPoints = GetPointsRouterApiFactory.create({
        operationId,
        contractId
      })
      const points = await getPoints.execute()
      set({ points })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  patchPoint: async (
    { operationId, contractId }: UrlParams,
    point: PointEntity
  ) => {
    try {
      const patchPoint = PatchPointRouterApiFactory.create({
        operationId,
        contractId
      })
      await patchPoint.execute(point)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  patchPointStatus: async (
    { operationId, contractId }: UrlParams,
    point: PointEnableAndDisableInterface
  ) => {
    try {
      const patchPoint = PatchPointStatusRouterApiFactory.create({
        operationId,
        contractId
      })
      await patchPoint.execute(point)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
