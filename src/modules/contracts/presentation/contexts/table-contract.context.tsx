'use client'

import { createContext, useContext } from 'react'
import type { ContractEntity } from '../../domain/entities/contract.entity'

export const TableContractContext = createContext<ContractEntity | null>(null)

export const useTableContract = () => {
  const context = useContext(TableContractContext)
  if (!context) {
    throw new Error(
      'useTableContract must be used within a <TableContracts.Item />'
    )
  }
  return context
}
