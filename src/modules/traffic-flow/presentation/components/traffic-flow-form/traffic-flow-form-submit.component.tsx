'use client'

import { LoadingSpinComponent } from '@/modules/shared/presentation/components/loading-spin/loading-spin.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useFormContext } from 'react-hook-form'

interface TrafficFlowFormSubmitComponentProps<T> {
  onSubmit: (values: T) => void
}

export function TrafficFlowFormSubmitComponent<T>({
  onSubmit
}: TrafficFlowFormSubmitComponentProps<T>) {
  const { handleSubmit, formState } = useFormContext<T>()
  const { isSubmitting } = formState

  return (
    <Button
      type="submit"
      className="w-full lg:w-[100px] lg:ms-auto"
      variant="primary"
      disabled={isSubmitting}
      onClick={handleSubmit(onSubmit)}
    >
      Filtrar <LoadingSpinComponent loading={isSubmitting} />
    </Button>
  )
}
