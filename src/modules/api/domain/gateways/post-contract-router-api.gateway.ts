import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import type { HttpContractError } from '@/modules/contracts/domain/validators/http-response-contracts.validator'

export interface PostContractRouterApiGateway {
  execute(contract: ContractEntity): Promise<HttpContractError>
}
