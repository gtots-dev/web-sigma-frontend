import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useMemo } from 'react'
import type { ContractEntity } from '../../domain/entities/contract.entity'
import {
  AddContractFormSchema,
  type AddContractFormType
} from '../schemas/add-contract-form.schema'

export function useAddContractForm() {
  const defaultValues = useMemo<ContractEntity>(
    () => ({
      name: '',
      alias: '',
      cfg: ''
    }),
    []
  )

  const methods = useForm<AddContractFormType>({
    resolver: zodResolver(AddContractFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
