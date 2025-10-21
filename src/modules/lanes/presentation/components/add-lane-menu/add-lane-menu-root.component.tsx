'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { useAddLaneForm } from '../../hooks/use-add-lane-form.hook'

interface AddLaneMenuRootComponentProps {
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function AddLaneMenuRootComponent({
  children,
  isOpen,
  close
}: AddLaneMenuRootComponentProps) {
  const { methods, defaultValues } = useAddLaneForm()
  
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
