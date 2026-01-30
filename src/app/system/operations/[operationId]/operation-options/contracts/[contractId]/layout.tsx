import { GetContractsFactory } from '@/modules/contracts/infrastructure/factories/get-contracts.factory'
import { cache, type ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import type { OperationEntity } from '@/modules/operations/domain/entities/operation.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

interface ContractLayoutProps {
  children: ReactNode
  params: Promise<UrlParams>
}

const getContractsCached = cache(async (operationId: OperationEntity['id']) => {
  const factory = GetContractsFactory.create({ operationId })
  return factory.execute()
})

export default async function ContractLayout({
  children,
  params
}: ContractLayoutProps) {
  const [{ operationId, contractId }] = await Promise.all([params])
  const { data: contracts } = await getContractsCached(operationId)
  const contract = contracts.find((c) => c.id === Number(contractId))

  if (!contract) {
    redirect(PATHNAMES.CONTRACTS(Number(operationId)))
  }

  return <>{children}</>
}
