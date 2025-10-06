'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { useAddContractForm } from '../../hooks/use-add-contract-form.hook'

interface AddContractMenuRootComponentProps {
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function AddContractMenuRootComponent({
  children,
  isOpen,
  close
}: AddContractMenuRootComponentProps) {
  const { methods, defaultValues } = useAddContractForm()
  
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
