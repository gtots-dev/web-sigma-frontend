'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { usePutContractStatusForm } from '../../hooks/use-put-contract-status-form.hook'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import { FormProvider } from 'react-hook-form'

interface PutContractStatusMenuRootComponentProps {
  contract: ContractEntity
  isOpen: boolean
  close: () => void
  children: ReactNode
}

export function PutContractStatusMenuRootComponent({
  contract,
  isOpen,
  close,
  children
}: PutContractStatusMenuRootComponentProps) {
  const { methods, defaultValues } = usePutContractStatusForm(contract)

  useEffect(() => {
    if (isOpen) methods.reset(defaultValues)
  }, [isOpen, defaultValues, methods])

  return (
    <FormProvider {...methods}>
      <DrawerDialog.Root open={isOpen} onOpenChange={close}>
        {children}
      </DrawerDialog.Root>
    </FormProvider>
  )
}
