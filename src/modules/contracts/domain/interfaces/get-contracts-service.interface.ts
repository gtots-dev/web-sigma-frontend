import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { ContractEntity } from '../entities/contract.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export interface GetContractsServiceInterface {
  execute(
    token: TokenEntities,
    { operationId }: UrlParams
  ): Promise<ContractEntity[]>
}
