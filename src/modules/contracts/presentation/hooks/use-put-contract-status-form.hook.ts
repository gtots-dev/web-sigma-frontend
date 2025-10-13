'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import type { ContractEntity } from '../../domain/entities/contract.entity'
import {
  PutContractStatusFormSchema,
  type PutContractStatusFormType
} from '../schemas/put-contract-status-form.schema'

export function usePutContractStatusForm(contract: ContractEntity) {
  const defaultValues = useMemo<Partial<ContractEntity>>(
    () => ({
      id: contract.id,
      enabled: contract.enabled
    }),
    [contract]
  )

  const methods = useForm<PutContractStatusFormType>({
    resolver: zodResolver(PutContractStatusFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
