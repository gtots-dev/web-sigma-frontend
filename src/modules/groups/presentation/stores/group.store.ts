import { create } from 'zustand'
import type { GroupEntity } from '../../domain/entities/group.entity'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { PostGroupRouterApiFactory } from '@/modules/api/infrastructure/factories/post-group-router-api.factory'
import { GetGroupsRouterApiFactory } from '@/modules/api/infrastructure/factories/get-groups-router-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PatchGroupRouterApiFactory } from '@/modules/api/infrastructure/factories/patch-group-router-api.factory'
import type { GroupEnableAndDisableInterface } from '../../domain/interfaces/group-enable-and-disable.interface'
import { PatchGroupStatusRouterApiFactory } from '@/modules/api/infrastructure/factories/patch-group-status-router-api.factory'
import type { GroupWithGroupInterface } from '../../domain/interfaces/group-with-group.interface'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'
import { PostGroupLaneRouterApiFactory } from '@/modules/api/infrastructure/factories/post-group-lane-router-api.factory'
import { DeleteGroupLaneRouterApiFactory } from '@/modules/api/infrastructure/factories/delete-group-lane-router-api.factory'
import type { PointEntity } from '@/modules/points/domain/entities/point.entity'
import { PostGroupPointRouterApiFactory } from '@/modules/api/infrastructure/factories/post-group-point-router-api.factory'
import { DeleteGroupPointRouterApiFactory } from '@/modules/api/infrastructure/factories/delete-group-point-router-api.factory'
import { PostGroupSubgroupRouterApiFactory } from '@/modules/api/infrastructure/factories/post-group-subgroup-router-api.factory'
import { DeleteGroupSubgroupRouterApiFactory } from '@/modules/api/infrastructure/factories/delete-group-subgroup-router-api.factory'

type GroupState = {
  groups: GroupWithGroupInterface[]
  getGroups: ({ operationId, contractId }: UrlParams) => Promise<void>
  addGroup: (
    { operationId, contractId }: UrlParams,
    group: GroupEntity
  ) => Promise<void>
  patchGroup: (
    { operationId, contractId }: UrlParams,
    group: GroupEntity
  ) => Promise<void>
  patchGroupStatus: (
    { operationId, contractId }: UrlParams,
    group: GroupEnableAndDisableInterface
  ) => Promise<void>
  postGroupLane: (
    { operationId, contractId, groupId }: UrlParams,
    laneId: LaneEntity['id']
  ) => Promise<void>
  deleteGroupLane: ({
    operationId,
    contractId,
    groupId,
    laneId
  }: UrlParams) => Promise<void>
  postGroupPoint: (
    { operationId, contractId, groupId }: UrlParams,
    pointId: PointEntity['id']
  ) => Promise<void>
  deleteGroupPoint: ({
    operationId,
    contractId,
    groupId,
    pointId
  }: UrlParams) => Promise<void>
  postGroupSubgroup: (
    { operationId, contractId, groupId }: UrlParams,
    subgroupId: GroupEntity['id']
  ) => Promise<void>
  deleteGroupSubgroup: ({
    operationId,
    contractId,
    groupId,
    subgroupId
  }: UrlParams) => Promise<void>
}

export const useGroupStore = create<GroupState>((set) => ({
  groups: [],

  addGroup: async (
    { operationId, contractId }: UrlParams,
    group: GroupEntity
  ) => {
    try {
      const postGroupRouterApiFactory = PostGroupRouterApiFactory.create({
        operationId,
        contractId
      })
      await postGroupRouterApiFactory.execute(group)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  getGroups: async ({ operationId, contractId }: UrlParams) => {
    try {
      const getGroups = GetGroupsRouterApiFactory.create({
        operationId,
        contractId
      })
      const groups = await getGroups.execute()
      set({ groups })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  patchGroup: async (
    { operationId, contractId }: UrlParams,
    group: GroupEntity
  ) => {
    try {
      const patchGroup = PatchGroupRouterApiFactory.create({
        operationId,
        contractId
      })
      await patchGroup.execute(group)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  patchGroupStatus: async (
    { operationId, contractId }: UrlParams,
    group: GroupEnableAndDisableInterface
  ) => {
    try {
      const patchGroup = PatchGroupStatusRouterApiFactory.create({
        operationId,
        contractId
      })
      await patchGroup.execute(group)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },
  postGroupLane: async (
    { operationId, contractId, groupId }: UrlParams,
    laneId: LaneEntity['id']
  ) => {
    try {
      const postGroupLane = PostGroupLaneRouterApiFactory.create({
        operationId,
        contractId,
        groupId
      })
      await postGroupLane.execute(laneId)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  deleteGroupLane: async ({
    operationId,
    contractId,
    groupId,
    laneId
  }: UrlParams) => {
    try {
      const deleteGroupLane = DeleteGroupLaneRouterApiFactory.create({
        operationId,
        contractId,
        groupId,
        laneId
      })
      await deleteGroupLane.execute()
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },
  postGroupPoint: async (
    { operationId, contractId, groupId }: UrlParams,
    pointId: PointEntity['id']
  ) => {
    try {
      const postGroupPoint = PostGroupPointRouterApiFactory.create({
        operationId,
        contractId,
        groupId
      })
      await postGroupPoint.execute(pointId)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  deleteGroupPoint: async ({
    operationId,
    contractId,
    groupId,
    pointId
  }: UrlParams) => {
    try {
      const deleteGroupPoint = DeleteGroupPointRouterApiFactory.create({
        operationId,
        contractId,
        groupId,
        pointId
      })
      await deleteGroupPoint.execute()
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  postGroupSubgroup: async (
    { operationId, contractId, groupId }: UrlParams,
    subgroupId: GroupEntity['id']
  ) => {
    try {
      const postGroupSubgroup = PostGroupSubgroupRouterApiFactory.create({
        operationId,
        contractId,
        groupId
      })
      await postGroupSubgroup.execute(subgroupId)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  deleteGroupSubgroup: async ({
    operationId,
    contractId,
    groupId,
    subgroupId
  }: UrlParams) => {
    try {
      const deleteGroupSubgroup = DeleteGroupSubgroupRouterApiFactory.create({
        operationId,
        contractId,
        groupId,
        subgroupId
      })
      await deleteGroupSubgroup.execute()
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
