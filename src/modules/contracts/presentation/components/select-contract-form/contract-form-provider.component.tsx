'use client'

import { useForm, FormProvider } from 'react-hook-form'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import type { ReactNode } from 'react'

interface FormValues {
  search: string
  contract: ContractEntity
}

interface ContractFormContextProviderComponentProps {
  children: ReactNode
  contract: ContractEntity
}

export function ContractFormContextProviderComponent({
  children,
  contract
}: ContractFormContextProviderComponentProps) {
  const formMethods = useForm<FormValues>({
    defaultValues: {
      search: '',
      contract: contract
    }
  })

  return <FormProvider {...formMethods}>{children}</FormProvider>
}
