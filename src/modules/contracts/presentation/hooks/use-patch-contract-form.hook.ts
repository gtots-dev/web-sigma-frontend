'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo, useEffect, useRef } from 'react'

import type { ContractEntity } from '../../domain/entities/contract.entity'
import {
  PatchContractFormSchema,
  type PatchContractFormType
} from '../schemas/patch-contract-form.schema'

export function usePatchContractForm(contract?: ContractEntity) {
  const previousContractIdRef = useRef<number | undefined>(undefined)

  const defaultValues = useMemo<Partial<ContractEntity>>(
    () => ({
      id: contract?.id,
      name: contract?.name ?? '',
      alias: contract?.alias ?? '',
      cfg: JSON.stringify(
        contract?.cfg === null || !contract?.cfg ? {} : contract.cfg
      )
    }),
    [contract]
  )

  const methods = useForm<PatchContractFormType>({
    resolver: zodResolver(PatchContractFormSchema),
    defaultValues
  })

  useEffect(() => {
    if (contract?.id && contract.id !== previousContractIdRef.current) {
      previousContractIdRef.current = contract.id
      methods.reset(defaultValues)
    }
  }, [contract?.id, defaultValues, methods])

  return {
    defaultValues,
    methods
  }
}
