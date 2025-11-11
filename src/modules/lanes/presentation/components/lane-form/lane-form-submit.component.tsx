'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useFormContext } from 'react-hook-form'

interface LaneFormSubmitComponentProps<T> {
  onSubmit: (values: T) => void
}

export function LaneFormSubmitComponent<T>({
  onSubmit
}: LaneFormSubmitComponentProps<T>) {
  const { handleSubmit } = useFormContext<T>()

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
