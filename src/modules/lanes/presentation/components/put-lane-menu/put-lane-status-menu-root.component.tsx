'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { usePutLaneStatusForm } from '../../hooks/use-put-lane-status-form.hook'
import { FormProvider } from 'react-hook-form'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'

interface PutLaneStatusMenuRootComponentProps {
  lane: LaneEntity
  isOpen: boolean
  close: () => void
  children: ReactNode
}

export function PutLaneStatusMenuRootComponent({
  lane,
  isOpen,
  close,
  children
}: PutLaneStatusMenuRootComponentProps) {
  const { methods, defaultValues } = usePutLaneStatusForm(lane)

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
