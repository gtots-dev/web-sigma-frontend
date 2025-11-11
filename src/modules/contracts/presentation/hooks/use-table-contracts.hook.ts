'use client'

import { useEffect, useState, useCallback } from 'react'
import type { ContractEntity } from '../../domain/entities/contract.entity'
import { useContractStore } from '../stores/contract.store'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export interface UseTableContractsResult {
  contracts: ContractEntity[]
  loading: boolean
}

export function useTableContracts(): UseTableContractsResult {
  const { contracts, getContracts: getContractsFromStore } = useContractStore()
  const { operationId }: UrlParams = useParams()
  const [loading, setLoading] = useState(true)

  const getContracts = useCallback(async () => {
    setLoading(true)
    await getContractsFromStore({ operationId })
    setLoading(false)
  }, [getContractsFromStore, operationId])

  useEffect(() => {
    getContracts()
  }, [getContracts])

  return { contracts, loading }
}
