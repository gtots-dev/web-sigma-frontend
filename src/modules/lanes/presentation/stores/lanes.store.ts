import { create } from 'zustand'
import type { LaneEntity } from '../../domain/entities/lane.entity'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { PostLaneRouterApiFactory } from '@/modules/api/infrastructure/factories/post-lane-router-api.factory'
import { GetLanesRouterApiFactory } from '@/modules/api/infrastructure/factories/get-lanes-router-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PatchLaneRouterApiFactory } from '@/modules/api/infrastructure/factories/patch-lane-router-api.factory'
import type { LaneEnableAndDisableInterface } from '../../domain/interfaces/lane-enable-and-disable.interface'
import { PatchLaneStatusRouterApiFactory } from '@/modules/api/infrastructure/factories/patch-lane-status-router-api.factory'
import { GetContractLanesRouterApiFactory } from '@/modules/api/infrastructure/factories/get-contract-lanes-router-api.factory'
import type { LaneWithPointAndGroupInterface } from '../../domain/interfaces/lane-with-point-and-group.interface'

type LaneState = {
  lanes: LaneEntity[]
  contractLanes: LaneWithPointAndGroupInterface[]
  getLanes: ({
    operationId,
    contractId,
    processingUnitId
  }: UrlParams) => Promise<void>
  getContractLanes: ({ operationId, contractId }: UrlParams) => Promise<void>
  addLane: (
    { operationId, contractId, processingUnitId }: UrlParams,
    lane: LaneEntity
  ) => Promise<void>
  patchLane: (
    { operationId, contractId, processingUnitId }: UrlParams,
    lane: LaneEntity
  ) => Promise<void>
  patchLaneStatus: (
    { operationId, contractId, processingUnitId }: UrlParams,
    lane: LaneEnableAndDisableInterface
  ) => Promise<void>
}

export const useLaneStore = create<LaneState>((set) => ({
  lanes: [],
  contractLanes: [],

  addLane: async (
    { operationId, contractId, processingUnitId }: UrlParams,
    lane: LaneEntity
  ) => {
    try {
      const postLaneRouterApiFactory = PostLaneRouterApiFactory.create({
        operationId,
        contractId,
        processingUnitId
      })
      await postLaneRouterApiFactory.execute(lane)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  getLanes: async ({
    operationId,
    contractId,
    processingUnitId
  }: UrlParams) => {
    try {
      const getLanes = GetLanesRouterApiFactory.create({
        operationId,
        contractId,
        processingUnitId
      })
      const { data: lanes } = await getLanes.execute()
      set({ lanes })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  getContractLanes: async ({ operationId, contractId }: UrlParams) => {
    try {
      const getContractLanes = GetContractLanesRouterApiFactory.create({
        operationId,
        contractId
      })
      const contractLanes = await getContractLanes.execute()
      set({ contractLanes })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  patchLane: async (
    { operationId, contractId, processingUnitId }: UrlParams,
    lane: LaneEntity
  ) => {
    try {
      const patchLane = PatchLaneRouterApiFactory.create({
        operationId,
        contractId,
        processingUnitId
      })
      await patchLane.execute(lane)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  patchLaneStatus: async (
    { operationId, contractId, processingUnitId }: UrlParams,
    lane: LaneEnableAndDisableInterface
  ) => {
    try {
      const patchLane = PatchLaneStatusRouterApiFactory.create({
        operationId,
        contractId,
        processingUnitId
      })
      await patchLane.execute(lane)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
