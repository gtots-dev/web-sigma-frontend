'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { usePostRestrictionForm } from '../../hooks/use-post-restriction-form.hook'

interface PostRestrictionMenuRootComponentProps {
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function PostRestrictionMenuRootComponent({
  children,
  isOpen,
  close
}: PostRestrictionMenuRootComponentProps) {
  const { methods, defaultValues } = usePostRestrictionForm()

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
