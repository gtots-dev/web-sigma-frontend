import { create } from 'zustand'
import { GetContractsRouterApiFactory } from '@/modules/api/infrastructure/factories/get-contracts-router-api.factory'
import type { ContractEntity } from '../../domain/entities/contract.entity'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { PostContractRouterApiFactory } from '@/modules/api/infrastructure/factories/post-contract-router-api.factory'

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
    try {
      const postContractsRouterApiFactory =
        PostContractRouterApiFactory.create()
      await postContractsRouterApiFactory.execute(contract)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
