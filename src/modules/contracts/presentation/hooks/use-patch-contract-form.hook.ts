'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'

import type { ContractEntity } from '../../domain/entities/contract.entity'
import {
  PatchContractFormSchema,
  type PatchContractFormType
} from '../schemas/patch-contract-form.schema'

export function usePatchContractForm(contract: ContractEntity) {
  const defaultValues = useMemo<ContractEntity>(
    () => ({
      id: contract?.id,
      name: contract?.name ?? '',
      alias: contract?.alias ?? '',
      cfg: JSON.stringify(contract?.cfg === null ? {} : contract?.cfg)
    }),
    [contract]
  )

  const methods = useForm<PatchContractFormType>({
    resolver: zodResolver(PatchContractFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
