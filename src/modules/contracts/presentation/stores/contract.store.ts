import { create } from 'zustand'
import { GetContractsRouterApiFactory } from '@/modules/api/infrastructure/factories/get-contracts-router-api.factory'
import type { ContractEntity } from '../../domain/entities/contract.entity'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'

type ContractState = {
  contracts: ContractEntity[]
  getContracts: () => Promise<void>
  addContract: (contract: ContractEntity) => Promise<void>
}

export const useContractStore = create<ContractState>((set) => ({
  contracts: [],

  getContracts: async () => {
    try {
      const getContractsRouterApiFactory = GetContractsRouterApiFactory.create()
      const contracts = await getContractsRouterApiFactory.execute()
      set({ contracts })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  addContract: async (contract: ContractEntity) => {
    const enhancedContract: ContractEntity = {
      ...contract,
      id: Math.random(),
    }
    set((state) => ({
      contracts: [...state.contracts, enhancedContract]
    }))
  }
}))
