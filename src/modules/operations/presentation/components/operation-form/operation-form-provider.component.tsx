'use client'

import { useForm, FormProvider } from 'react-hook-form'
import type { ReactNode } from 'react'
import type { OperationInterface } from '@/modules/operations/domain/interfaces/operation.interface'
import type { OperationEntity } from '@/modules/operations/domain/entities/operation.entity'

interface FormValues {
  search: string
  operation: OperationInterface
}

interface OperationFormContextProviderComponentProps {
  children: ReactNode
  operation: OperationEntity
}

export function OperationFormContextProviderComponent({
  children,
  operation
}: OperationFormContextProviderComponentProps) {
  const formMethods = useForm<FormValues>({
    defaultValues: {
      search: '',
      operation: operation
    }
  })

  return <FormProvider {...formMethods}>{children}</FormProvider>
}
