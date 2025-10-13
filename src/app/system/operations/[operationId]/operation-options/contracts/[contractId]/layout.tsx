import { auth } from '@/auth'
import { GetContractsFactory } from '@/modules/contracts/infrastructure/factories/get-contracts.factory'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'

const getContractsCached = cache(async (JWT: TokenEntities) => {
  const factory = GetContractsFactory.create()
  return factory.execute(JWT)
})

export default async function ContractLayout({ children, params }) {
  const [{ token: JWT }, { operationId, contractId }] = await Promise.all([
    auth(),
    params
  ])

  const contracts = await getContractsCached(JWT)
  const contract = contracts.find((c) => c.id === Number(contractId))

  if (!contract) {
    redirect(PATHNAMES.CONTRACTS(Number(operationId)))
  }

  return <>{ children }</>
}
