'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { usePatchPointStatusForm } from '../../hooks/use-patch-point-status-form.hook'
import type { PointEnableAndDisableInterface } from '@/modules/points/domain/interfaces/point-enable-and-disable.interface'

interface PatchPointStatusMenuRootComponentProps {
  point: PointEnableAndDisableInterface
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function PatchPointStatusMenuRootComponent({
  point,
  children,
  isOpen,
  close
}: PatchPointStatusMenuRootComponentProps) {
  const { methods, defaultValues } = usePatchPointStatusForm(point)

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
