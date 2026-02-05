'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { usePostUserFilesForm } from '../../hooks/use-post-user-files-form.hook'

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
  const { methods, defaultValues } = usePostUserFilesForm()

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
