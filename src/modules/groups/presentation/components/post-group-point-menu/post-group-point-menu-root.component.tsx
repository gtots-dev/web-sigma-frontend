'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { usePostGroupPointForm } from '../../hooks/use-post-group-point-form.hook'
import type { GroupEntity } from '@/modules/groups/domain/entities/group.entity'

interface PostGroupPointMenuRootComponentProps {
  groupId: GroupEntity['id']
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function PostGroupPointMenuRootComponent({
  groupId,
  children,
  isOpen,
  close
}: PostGroupPointMenuRootComponentProps) {
  const { methods, defaultValues } = usePostGroupPointForm(groupId)

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
