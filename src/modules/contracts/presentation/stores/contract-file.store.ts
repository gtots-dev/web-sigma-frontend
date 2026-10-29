import { create } from 'zustand'
import type { ContractFileInterface } from '../../domain/interfaces/contract-file.interface'
import { GetContractFilesRouterApiFactory } from '@/modules/api/infrastructure/factories/get-contract-files-router-api.factory'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { ContractFilesInterface } from '../../domain/interfaces/contract-files.interface'
import { PostContractFilesRouterApiFactory } from '@/modules/api/infrastructure/factories/post-contract-files-router-api.factory'
import { GetContractFileRouterApiFactory } from '@/modules/api/infrastructure/factories/get-contract-file-router-api.factory'
import type { UrlFileInterface } from '../../domain/interfaces/url-file.interface'

type ContractFileState = {
  files: ContractFileInterface[]
  logoUrl: string | null
  loadingLogo: boolean
  postContractFiles: (
    { contractId, operationId }: UrlParams,
    files: ContractFilesInterface
  ) => Promise<void>
  getContractFiles: (
    { contractId, operationId }: UrlParams
  ) => Promise<ContractFileInterface[]>
  getContractFile: (
    { contractId, fileId, operationId }: UrlParams
  ) => Promise<UrlFileInterface>
  loadContractLogo: (
    { contractId, operationId }: UrlParams
  ) => Promise<string | null>
  setLogoUrl: (logoUrl: string | null) => void
}

export const useContractFileStore = create<ContractFileState>((set) => ({
  files: [],
  logoUrl: null,
  loadingLogo: false,

  setLogoUrl: (logoUrl: string | null) => set({ logoUrl }),

  postContractFiles: async (
    { contractId, operationId }: UrlParams,
    files: ContractFilesInterface
  ) => {
    try {
      const postContractFilesRouterApiFactory =
        PostContractFilesRouterApiFactory.create({
          contractId,
          operationId
        })
      await postContractFilesRouterApiFactory.execute(files)
    } catch (error) {
      if (error instanceof HttpResponseError) throw error
    }
  },

  getContractFiles: async ({ contractId, operationId }: UrlParams) => {
    try {
      const getContractFilesRouterApiFactory =
        GetContractFilesRouterApiFactory.create({
          contractId,
          operationId
        })
      const files = await getContractFilesRouterApiFactory.execute()
      set({ files })
      return files
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
      return []
    }
  },

  getContractFile: async ({ contractId, fileId, operationId }: UrlParams) => {
    try {
      const getContractFileRouterApiFactory =
        GetContractFileRouterApiFactory.create({
          contractId,
          fileId,
          operationId
        })
      return await getContractFileRouterApiFactory.execute()
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
      return { url: '' }
    }
  },

  loadContractLogo: async ({ contractId, operationId }: UrlParams) => {
    set({ loadingLogo: true })
    try {
      const getContractFilesRouterApiFactory =
        GetContractFilesRouterApiFactory.create({
          contractId,
          operationId
        })
      const files = await getContractFilesRouterApiFactory.execute()
      set({ files })

      if (!files || files.length === 0) {
        set({ logoUrl: null, loadingLogo: false })
        return null
      }

      const imageFiles = files.filter((f) => {
        const name = (f.original_name || f.filename || '').toLowerCase()
        return /\.(png|jpe?g)$/i.test(name) || f.storage_type?.includes('image')
      })
      const targetFile =
        imageFiles.length > 0
          ? imageFiles[imageFiles.length - 1]
          : files[files.length - 1]

      if (!targetFile?.id) {
        set({ logoUrl: null, loadingLogo: false })
        return null
      }

      const getContractFileRouterApiFactory =
        GetContractFileRouterApiFactory.create({
          contractId,
          fileId: String(targetFile.id),
          operationId
        })
      const { url } = await getContractFileRouterApiFactory.execute()
      set({ logoUrl: url, loadingLogo: false })
      return url
    } catch {
      set({ logoUrl: null, loadingLogo: false })
      return null
    }
  }
}))
