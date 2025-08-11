'use client'

import { ReactNode } from 'react'
import { MESSAGES_CONTRACTS } from '@/modules/shared/presentation/messages/contracts'
import { TableBody } from '@/modules/shared/presentation/components/shadcn/table'
import { TableMessage } from '@/modules/shared/presentation/components/table-addons/table-message.component'
import { TableLoading } from '@/modules/shared/presentation/components/table-addons/table-loading.component'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import { TableContractContext } from '../../contexts/table-contract.context'
import { useTableContracts } from '../../hooks/use-table-contracts.hook'

interface TableContractsBodyComponentProps {
  children: ReactNode
}

export function TableContractsBodyComponent({
  children
}: TableContractsBodyComponentProps) {
  const { contracts, loading } = useTableContracts()

  if (loading)
    return (
      <TableBody>
        <TableLoading colSpan={5} />
      </TableBody>
    )

  if (contracts.length === 0)
    return (
      <TableBody>
        <TableMessage colSpan={5} message={MESSAGES_CONTRACTS['3.3']} />
      </TableBody>
    )

  return (
    <TableBody>
      {contracts.map((contract: ContractEntity) => (
        <TableContractContext.Provider key={contract.id} value={contract}>
          {children}
        </TableContractContext.Provider>
      ))}
    </TableBody>
  )
}
