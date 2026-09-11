'use client'

import { LoadingSpinComponent } from '@/modules/shared/presentation/components/loading-spin/loading-spin.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useSmartFormSubmit } from '@/modules/shared/presentation/hooks/use-smart-form-submit.hook'
import { useFormContext, type FieldValues } from 'react-hook-form'

interface PointFormSubmitComponentProps<T extends FieldValues> {
  onSubmit: (values: T | Partial<T>) => void
}

export function PointFormSubmitComponent<T extends FieldValues>({
  onSubmit
}: PointFormSubmitComponentProps<T>) {
  const handleSmartSubmit = useSmartFormSubmit<T>(onSubmit)
  const { formState } = useFormContext<T>()
  const { isSubmitting } = formState

  return (
    <Button
      type="submit"
      className="w-full sm:w-[150px]"
      variant="primary"
      disabled={isSubmitting}
      onClick={handleSmartSubmit}
    >
      Confirmar <LoadingSpinComponent loading={isSubmitting} />
    </Button>
  )
}
