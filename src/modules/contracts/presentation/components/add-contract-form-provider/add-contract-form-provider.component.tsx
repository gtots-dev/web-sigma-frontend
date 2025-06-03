'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import {
  AddContractFormSchema,
  type AddContractFormType
} from '../../schemas/add-contract-form.schema'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'

interface AddContractFormContextProviderComponentProps {
  children: ReactNode
  isOpen: boolean
}

export function AddContractFormContextProviderComponent({
  children,
  isOpen
}: AddContractFormContextProviderComponentProps) {
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

  useEffect(() => {
    if (isOpen) {
      methods.reset(defaultValues)
    }
  }, [isOpen, defaultValues, methods])

  return <FormProvider {...methods}>{children}</FormProvider>
}
