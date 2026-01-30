import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { OperationEntity } from '../../domain/entities/operation.entity'
import { GetOperationRouterApiFactory } from '@/modules/api/infrastructure/factories/get-operation-router-api.factory'

type OperationsState = {
  operations: OperationEntity[]
  getOperations: () => Promise<void>
}

export const useOperationsStore = create<OperationsState>((set) => ({
  operations: [],

  getOperations: async () => {
    try {
      const getOperationRouterApiFactory = GetOperationRouterApiFactory.create()
      const { data: operations } = await getOperationRouterApiFactory.execute()
      set({ operations })
    } catch (error) {
      if (error instanceof HttpResponseError) throw error
    }
  }
}))
