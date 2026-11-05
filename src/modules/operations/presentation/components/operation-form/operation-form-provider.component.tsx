'use client'

import { useEffect, type ReactNode } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import type { OperationInterface } from '@/modules/operations/domain/interfaces/operation.interface'
import type { OperationEntity } from '@/modules/operations/domain/entities/operation.entity'

interface FormValues {
  search: string
  operation: OperationInterface
}

interface OperationFormContextProviderComponentProps {
  children: ReactNode
  operation: OperationEntity | null
}

export function OperationFormContextProviderComponent({
  children,
  operation
}: OperationFormContextProviderComponentProps) {
  const formMethods = useForm<FormValues>({
    defaultValues: {
      search: '',
      operation: operation ?? { id: null, name: null }
    }
  })

  useEffect(() => {
    const currentOperationId = formMethods.getValues('operation')?.id
    if (!currentOperationId && operation?.id) {
      formMethods.reset({
        search: '',
        operation
      })
    }
  }, [operation, formMethods])

  return <FormProvider {...formMethods}>{children}</FormProvider>
}
