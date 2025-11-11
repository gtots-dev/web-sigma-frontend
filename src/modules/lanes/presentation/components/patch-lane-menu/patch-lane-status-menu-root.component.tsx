'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { usePatchLaneStatusForm } from '../../hooks/use-patch-lane-status-form.hook'
import { FormProvider } from 'react-hook-form'
import type { LaneEnableAndDisableInterface } from '@/modules/lanes/domain/interfaces/lane-enable-and-disable.interface'

interface PatchLaneStatusMenuRootComponentProps {
  lane: LaneEnableAndDisableInterface
  isOpen: boolean
  close: () => void
  children: ReactNode
}

export function PatchLaneStatusMenuRootComponent({
  lane,
  isOpen,
  close,
  children
}: PatchLaneStatusMenuRootComponentProps) {
  const { methods, defaultValues } = usePatchLaneStatusForm(lane)

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
