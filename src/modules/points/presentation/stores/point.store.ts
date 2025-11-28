import { create } from 'zustand'
import type { PointEntity } from '../../domain/entities/point.entity'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { PostPointRouterApiFactory } from '@/modules/api/infrastructure/factories/post-point-router-api.factory'
import { GetPointsRouterApiFactory } from '@/modules/api/infrastructure/factories/get-points-router-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PatchPointRouterApiFactory } from '@/modules/api/infrastructure/factories/patch-point-router-api.factory'
import type { PointEnableAndDisableInterface } from '../../domain/interfaces/point-enable-and-disable.interface'
import { PatchPointStatusRouterApiFactory } from '@/modules/api/infrastructure/factories/patch-point-status-router-api.factory'
import type { PointWithGroupInterface } from '../../domain/interfaces/point-with-group.interface'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'
import { PostPointLaneRouterApiFactory } from '@/modules/api/infrastructure/factories/post-point-lane-router-api.factory'
import { DeletePointLaneRouterApiFactory } from '@/modules/api/infrastructure/factories/delete-point-lane-router-api.factory'

type PointState = {
  points: PointWithGroupInterface[]
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
  postPointLane: (
    { operationId, contractId, pointId }: UrlParams,
    laneId: LaneEntity['id']
  ) => Promise<void>
  deletePointLane: ({
    operationId,
    contractId,
    pointId,
    laneId
  }: UrlParams) => Promise<void>
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
  },
  postPointLane: async (
    { operationId, contractId, pointId }: UrlParams,
    laneId: LaneEntity['id']
  ) => {
    try {
      const postPointLane = PostPointLaneRouterApiFactory.create({
        operationId,
        contractId,
        pointId
      })
      await postPointLane.execute(laneId)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  deletePointLane: async ({
    operationId,
    contractId,
    pointId,
    laneId
  }: UrlParams) => {
    try {
      const deletePointLane = DeletePointLaneRouterApiFactory.create({
        operationId,
        contractId,
        pointId,
        laneId
      })
      await deletePointLane.execute()
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
