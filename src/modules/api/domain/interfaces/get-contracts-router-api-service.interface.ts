import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export interface GetContractsRouterApiServiceInterface {
  execute({ operationId }: UrlParams): Promise<ContractEntity[]>
}
