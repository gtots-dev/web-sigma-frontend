'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'

import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'
import { useEditProcessingUnitForm } from '../../hooks/use-edit-processing-unit-form.hook'

interface EditProcessingUnitMenuRootComponentProps {
  processingUnit: ProcessingUnitEntity
  isOpen: boolean
  close: () => void
  children: ReactNode
}

export function EditProcessingUnitMenuRootComponent({
  processingUnit,
  isOpen,
  close,
  children
}: EditProcessingUnitMenuRootComponentProps) {
  const { methods, defaultValues } = useEditProcessingUnitForm(processingUnit)

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
