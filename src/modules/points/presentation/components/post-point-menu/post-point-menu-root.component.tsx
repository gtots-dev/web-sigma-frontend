'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { usePostPointForm } from '../../hooks/use-post-point-form.hook'

interface PostPointMenuRootComponentProps {
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function PostPointMenuRootComponent({
  children,
  isOpen,
  close
}: PostPointMenuRootComponentProps) {
  const { methods, defaultValues } = usePostPointForm()
  
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
