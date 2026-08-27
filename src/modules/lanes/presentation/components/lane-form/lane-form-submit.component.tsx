'use client'

import { LoadingSpinComponent } from '@/modules/shared/presentation/components/loading-spin/loading-spin.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useFormContext } from 'react-hook-form'

interface LaneFormSubmitComponentProps<T> {
  onSubmit: (values: T) => void
}

export function LaneFormSubmitComponent<T>({
  onSubmit
}: LaneFormSubmitComponentProps<T>) {
  const { handleSubmit, formState } = useFormContext<T>()
  const { isSubmitting } = formState

  return (
    <Button
      className="w-full sm:w-[150px]"
      variant="primary"
      disabled={isSubmitting}
      onClick={handleSubmit(onSubmit)}
    >
      Confirmar <LoadingSpinComponent loading={isSubmitting} />
    </Button>
  )
}
