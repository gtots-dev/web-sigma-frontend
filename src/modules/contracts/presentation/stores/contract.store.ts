import { create } from 'zustand'
import { GetContractsRouterApiFactory } from '@/modules/api/infrastructure/factories/get-contracts-router-api.factory'
import type { ContractEntity } from '../../domain/entities/contract.entity'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { PostContractRouterApiFactory } from '@/modules/api/infrastructure/factories/post-contract-router-api.factory'
import { PatchContractRouterApiFactory } from '@/modules/api/infrastructure/factories/patch-contract-router-api.factory'
import { PutContractStatusRouterApiFactory } from '@/modules/api/infrastructure/factories/put-contract-status-router-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

type ContractState = {
  contracts: ContractEntity[]
  contract: ContractEntity
  getContracts: ({ operationId }: UrlParams) => Promise<void>
  addContract: (
    { operationId }: UrlParams,
    contract: ContractEntity
  ) => Promise<void>
  patchContract: (
    { operationId }: UrlParams,
    contract: ContractEntity
  ) => Promise<void>
  updateStatus: (
    { operationId }: UrlParams,
    contract: ContractEntity
  ) => Promise<void>
  setContract: (contract: ContractEntity) => Promise<void>
}

export const useContractStore = create<ContractState>((set) => ({
  contracts: [],
  contract: {
    alias: '',
    cfg: '',
    name: '',
    operation_id: 0
  },

  getContracts: async ({ operationId }: UrlParams) => {
    try {
      const getContractsRouterApiFactory = GetContractsRouterApiFactory.create({
        operationId
      })
      const contracts = await getContractsRouterApiFactory.execute()
      set({ contracts })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  addContract: async ({ operationId }: UrlParams, contract: ContractEntity) => {
    try {
      const postContractsRouterApiFactory = PostContractRouterApiFactory.create(
        { operationId }
      )
      await postContractsRouterApiFactory.execute(contract)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  patchContract: async (
    { operationId }: UrlParams,
    contract: ContractEntity
  ) => {
    try {
      const putContractsRouterApiFactory = PatchContractRouterApiFactory.create(
        { operationId }
      )
      await putContractsRouterApiFactory.execute(contract)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  updateStatus: async (
    { operationId }: UrlParams,
    contract: ContractEntity
  ) => {
    try {
      const putContractStatusRouterApiFactory =
        PutContractStatusRouterApiFactory.create({ operationId })
      await putContractStatusRouterApiFactory.execute(contract)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  setContract: async (contract: ContractEntity): Promise<void> => {
    set({ contract })
  }
}))
