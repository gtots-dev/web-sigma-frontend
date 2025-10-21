'use client'

import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useFormContext } from 'react-hook-form'

interface LaneFormSubmitComponentProps {
  onSubmit: (lane: LaneEntity) => void
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
