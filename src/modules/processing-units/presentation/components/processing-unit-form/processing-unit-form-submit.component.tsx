'use client'

import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useFormContext } from 'react-hook-form'

interface ProcessingUnitFormSubmitComponentProps {
  onSubmit: (processingUnit: ProcessingUnitEntity) => void
}

export function ProcessingUnitFormSubmitComponent({
  onSubmit
}: ProcessingUnitFormSubmitComponentProps) {
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
