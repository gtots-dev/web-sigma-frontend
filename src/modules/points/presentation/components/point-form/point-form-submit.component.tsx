'use client'

import { LoadingSpinComponent } from '@/modules/shared/presentation/components/loading-spin/loading-spin.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useFormContext } from 'react-hook-form'

interface PointFormSubmitComponentProps<T> {
  onSubmit: (values: T) => void
}

export function PointFormSubmitComponent<T>({
  onSubmit
}: PointFormSubmitComponentProps<T>) {
  const { handleSubmit, formState } = useFormContext<T>()
  const { isSubmitting, isSubmitSuccessful } = formState

  return (
    <Button
      type="submit"
      className="w-full sm:w-[150px]"
      variant="primary"
      disabled={isSubmitting || isSubmitSuccessful}
      onClick={handleSubmit(onSubmit)}
    >
      Confirmar <LoadingSpinComponent loading={isSubmitting} />
    </Button>
  )
}
