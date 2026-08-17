'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { SmartFormProvider } from '@/modules/shared/presentation/contexts/smart-form.context'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { usePatchLaneStatusForm } from '../../hooks/use-patch-lane-status-form.hook'
import type { LaneEnableAndDisableInterface } from '@/modules/lanes/domain/interfaces/lane-enable-and-disable.interface'

interface PatchLaneStatusMenuRootComponentProps {
  lane: LaneEnableAndDisableInterface
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function PatchLaneStatusMenuRootComponent({
  lane,
  children,
  isOpen,
  close
}: PatchLaneStatusMenuRootComponentProps) {
  const { methods, defaultValues } = usePatchLaneStatusForm(lane)

  useEffect(() => {
    if (isOpen) methods.reset(defaultValues)
  }, [isOpen, defaultValues, methods])

  return (
    <SmartFormProvider isPatch>
      <FormProvider {...methods}>
        <DrawerDialog.Root open={isOpen} onOpenChange={close}>
          {children}
        </DrawerDialog.Root>
      </FormProvider>
    </SmartFormProvider>
  )
}
