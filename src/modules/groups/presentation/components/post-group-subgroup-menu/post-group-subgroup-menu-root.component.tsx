'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { usePostGroupSubgroupForm } from '../../hooks/use-post-group-subgroup-form.hook'
import type { GroupEntity } from '@/modules/groups/domain/entities/group.entity'

interface PostGroupSubgroupMenuRootComponentProps {
  groupId: GroupEntity['id']
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function PostGroupSubgroupMenuRootComponent({
  groupId,
  children,
  isOpen,
  close
}: PostGroupSubgroupMenuRootComponentProps) {
  const { methods } = usePostGroupSubgroupForm(groupId)
  return (
    <FormProvider {...methods} key={`group-${groupId}-${isOpen ? 'open' : 'closed'}`}>
      <DrawerDialog.Root open={isOpen} onOpenChange={close}>
        {children}
      </DrawerDialog.Root>
    </FormProvider>
  )
}