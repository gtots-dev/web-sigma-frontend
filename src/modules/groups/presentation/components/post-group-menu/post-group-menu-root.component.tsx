'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { usePostGroupForm } from '../../hooks/use-post-group-form.hook'

interface PostGroupMenuRootComponentProps {
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function PostGroupMenuRootComponent({
  children,
  isOpen,
  close
}: PostGroupMenuRootComponentProps) {
  const { methods, defaultValues } = usePostGroupForm()
  
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
