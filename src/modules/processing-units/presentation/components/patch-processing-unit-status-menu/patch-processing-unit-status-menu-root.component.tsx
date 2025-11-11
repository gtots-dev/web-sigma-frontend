'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { usePatchProcessingUnitStatusForm } from '../../hooks/use-patch-processing-unit-status-form.hook'
import { FormProvider } from 'react-hook-form'
import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'

interface PatchProcessingUnitsStatusMenuRootComponentProps {
  processingUnit: ProcessingUnitEntity
  isOpen: boolean
  close: () => void
  children: ReactNode
}

export function PatchProcessingUnitsStatusMenuRootComponent({
  processingUnit,
  isOpen,
  close,
  children
}: PatchProcessingUnitsStatusMenuRootComponentProps) {
  const { methods, defaultValues } = usePatchProcessingUnitStatusForm(processingUnit)

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
