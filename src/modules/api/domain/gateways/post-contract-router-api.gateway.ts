import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export interface PostContractRouterApiGateway {
  execute(
    contract: ContractEntity
  ): Promise<HttpResponseInterface<ContractEntity>>
}
