'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import {
  EditContractFormSchema,
  type EditContractFormType
} from '../../schemas/edit-contract-form.schema'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'

interface EditContractFormContextProviderComponentProps {
  children: ReactNode
  contract?: ContractEntity
  isOpen: boolean
}

export function EditContractFormContextProviderComponent({
  children,
  contract,
  isOpen
}: EditContractFormContextProviderComponentProps) {
  const defaultValues = useMemo<Partial<ContractEntity>>(
    () => ({
      id: contract?.id,
      name: contract?.name,
      alias: contract?.alias,
      cfg: contract?.cfg
    }),
    [contract]
  )

  const methods = useForm<EditContractFormType>({
    resolver: zodResolver(EditContractFormSchema),
    defaultValues
  })

  useEffect(() => {
    if (isOpen) {
      methods.reset(defaultValues)
    }
  }, [isOpen, defaultValues, methods])

  return <FormProvider {...methods}>{children}</FormProvider>
}
