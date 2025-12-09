'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { usePatchGroupStatusForm } from '../../hooks/use-patch-group-status-form.hook'
import type { GroupEnableAndDisableInterface } from '@/modules/groups/domain/interfaces/group-enable-and-disable.interface'

interface PatchGroupStatusMenuRootComponentProps {
  group: GroupEnableAndDisableInterface
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function PatchGroupStatusMenuRootComponent({
  group,
  children,
  isOpen,
  close
}: PatchGroupStatusMenuRootComponentProps) {
  const { methods, defaultValues } = usePatchGroupStatusForm(group)

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
