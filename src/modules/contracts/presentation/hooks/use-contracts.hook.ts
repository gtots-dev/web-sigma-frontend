'use client'

import { useEffect, useState, useCallback } from 'react'
import type { ContractEntity } from '../../domain/entities/contract.entity'
import { useContractStore } from '../stores/contract.store'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export interface UseContractsResult {
  contracts: ContractEntity[]
  loading: boolean
  error: boolean
  getContractById: (id: number) => ContractEntity | undefined
}

/**
 * Hook centralizado do módulo de contratos.
 * Gerencia a reutilização dos contratos em memória (Zustand) e busca condicional apenas se a store estiver vazia (ex: F5 / Acesso direto).
 */
export function useContracts(): UseContractsResult {
  const {
    contracts,
    getContracts: getContractsFromStore,
    loading: storeLoading
  } = useContractStore()
  const { operationId }: UrlParams = useParams()
  const [loading, setLoading] = useState(() => contracts.length === 0)
  const [error, setError] = useState(false)

  const fetchContractsIfNeeded = useCallback(async () => {
    // SÓ faz a requisição se a memória/store estiver vazia
    if (contracts.length === 0) {
      setLoading(true)
    }
    setError(false)
    try {
      if (contracts.length === 0) {
        await getContractsFromStore({ operationId })
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [contracts.length, getContractsFromStore, operationId])

  useEffect(() => {
    fetchContractsIfNeeded()
  }, [fetchContractsIfNeeded])

  const getContractById = useCallback(
    (id: number) => contracts.find((c) => c.id === id),
    [contracts]
  )

  return {
    contracts,
    loading: (loading || storeLoading) && contracts.length === 0,
    error,
    getContractById
  }
}
