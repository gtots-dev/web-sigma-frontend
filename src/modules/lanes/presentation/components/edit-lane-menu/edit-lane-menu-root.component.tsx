'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'

import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'
import { useEditLaneForm } from '../../hooks/use-edit-lane-form.hook'

interface EditLaneMenuRootComponentProps {
  lane: LaneEntity
  isOpen: boolean
  close: () => void
  children: ReactNode
}

export function EditLaneMenuRootComponent({
  lane,
  isOpen,
  close,
  children
}: EditLaneMenuRootComponentProps) {
  const { methods, defaultValues } = useEditLaneForm(lane)

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
