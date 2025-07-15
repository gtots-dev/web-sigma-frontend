'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useFormContext } from 'react-hook-form'

interface PermissionProfileFormSubmitComponentProps<T> {
  onSubmit: (data: T) => void
}

export function PermissionProfileFormSubmitComponent<T>({
  onSubmit
}: PermissionProfileFormSubmitComponentProps<T>) {
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
