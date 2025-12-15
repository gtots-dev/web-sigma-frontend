'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { usePostGroupLaneForm } from '../../hooks/use-post-group-lane-form.hook'
import type { GroupEntity } from '@/modules/groups/domain/entities/group.entity'

interface PostGroupLaneMenuRootComponentProps {
  groupId: GroupEntity['id']
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function PostGroupLaneMenuRootComponent({
  groupId,
  children,
  isOpen,
  close
}: PostGroupLaneMenuRootComponentProps) {
  const { methods, defaultValues } = usePostGroupLaneForm(groupId)

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
