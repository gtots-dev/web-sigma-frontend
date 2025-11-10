'use client'

import type { LaneEnableAndDisableInterface } from '@/modules/lanes/domain/interfaces/lane-enable-and-disable.interface'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useFormContext } from 'react-hook-form'

interface LaneFormSubmitComponentProps {
  onSubmit: (lane: LaneEnableAndDisableInterface) => void
}

export function LaneFormSubmitComponent({
  onSubmit
}: LaneFormSubmitComponentProps) {
  const { handleSubmit } = useFormContext()

  return (
    <Button
      className="w-full sm:w-[150px]"
      variant="primary"
      onClick={handleSubmit(onSubmit)}
    >
      Confirmar
    </Button>
  )
}
