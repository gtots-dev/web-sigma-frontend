'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { usePostVehicleTypeForm } from '../../hooks/use-post-vehicle-form.hook'

interface PostVehicleMenuRootComponentProps {
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function PostVehicleMenuRootComponent({
  children,
  isOpen,
  close
}: PostVehicleMenuRootComponentProps) {
  const { methods, defaultValues } = usePostVehicleTypeForm()
  
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
