'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { usePatchPointForm } from '../../hooks/use-patch-point-form.hook'
import type { PointEntity } from '@/modules/points/domain/entities/point.entity'

interface PatchPointMenuRootComponentProps {
  point: PointEntity
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function PatchPointMenuRootComponent({
  point,
  children,
  isOpen,
  close
}: PatchPointMenuRootComponentProps) {
  const { methods, defaultValues } = usePatchPointForm(point)

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
