'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { usePatchUserForm } from '../../hooks/use-patch-user-form.hook'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'

interface EditUserMenuRootComponentProps {
  user: UserEntity
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function EditUserMenuRootComponent({
  user,
  children,
  isOpen,
  close
}: EditUserMenuRootComponentProps) {
  const { methods, defaultValues } = usePatchUserForm(user)

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
