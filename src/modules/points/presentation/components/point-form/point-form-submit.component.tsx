'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useFormContext } from 'react-hook-form'

interface PointFormSubmitComponentProps<T> {
  onSubmit: (values: T) => void
}

export function PointFormSubmitComponent<T>({
  onSubmit
}: PointFormSubmitComponentProps<T>) {
  const { handleSubmit } = useFormContext<T>()

  return (
    <Button
      type="submit"
      className="w-full sm:w-[150px]"
      variant="primary"
      onClick={handleSubmit(onSubmit)}
    >
      Confirmar
    </Button>
  )
}
