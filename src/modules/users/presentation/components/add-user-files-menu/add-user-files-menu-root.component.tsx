'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { usePostUserForm } from '../../hooks/use-post-user-form.hook'
import { FormProvider } from 'react-hook-form'

interface AddUserFilesMenuRootComponentProps {
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function AddUserFilesMenuRootComponent({
  children,
  isOpen,
  close
}: AddUserFilesMenuRootComponentProps) {
  const { methods, defaultValues } = usePostUserForm()

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
