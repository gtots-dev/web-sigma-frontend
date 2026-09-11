'use client'

import { LoadingSpinComponent } from '@/modules/shared/presentation/components/loading-spin/loading-spin.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useSmartFormSubmit } from '@/modules/shared/presentation/hooks/use-smart-form-submit.hook'
import { useFormContext } from 'react-hook-form'

interface ContractFormSubmitComponentProps<T extends object> {
  onSubmit: (contract: T | Partial<T>) => void
}

export function ContractFormSubmitComponent<T extends object>({
  onSubmit
}: ContractFormSubmitComponentProps<T>) {
  const handleSmartSubmit = useSmartFormSubmit<T & object>(
    onSubmit as (v: (T & object) | Partial<T & object>) => void
  )
  const { formState } = useFormContext()
  const { isSubmitting } = formState

  return (
    <Button
      className="w-full sm:w-[150px]"
      variant="primary"
      disabled={isSubmitting}
      onClick={handleSmartSubmit}
    >
      Confirmar <LoadingSpinComponent loading={isSubmitting} />
    </Button>
  )
}
