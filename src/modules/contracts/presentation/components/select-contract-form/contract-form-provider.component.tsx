'use client'

import { useEffect, type ReactNode } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'

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

  useEffect(() => {
    const currentContractId = formMethods.getValues('contract')?.id
    if (!currentContractId && contract?.id) {
      formMethods.reset({
        search: '',
        contract
      })
    }
  }, [contract, formMethods])

  return <FormProvider {...formMethods}>{children}</FormProvider>
}
