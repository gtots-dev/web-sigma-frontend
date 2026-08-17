'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { SmartFormProvider } from '@/modules/shared/presentation/contexts/smart-form.context'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { usePatchContractForm } from '../../hooks/use-patch-contract-form.hook'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'

interface PatchContractMenuRootComponentProps {
  contract: ContractEntity
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function PatchContractMenuRootComponent({
  contract,
  children,
  isOpen,
  close
}: PatchContractMenuRootComponentProps) {
  const { methods, defaultValues } = usePatchContractForm(contract)

  useEffect(() => {
    if (isOpen) methods.reset(defaultValues)
  }, [isOpen, defaultValues, methods])

  return (
    <SmartFormProvider isPatch>
      <FormProvider {...methods}>
        <DrawerDialog.Root open={isOpen} onOpenChange={close}>
          {children}
        </DrawerDialog.Root>
      </FormProvider>
    </SmartFormProvider>
  )
}
