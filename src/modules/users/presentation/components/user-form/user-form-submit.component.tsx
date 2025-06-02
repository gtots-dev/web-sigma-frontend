'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useFormContext } from 'react-hook-form'

interface UserFormSubmitComponentProps<T> {
  onSubmit: (data: T) => void
}

export function UserFormSubmitComponent<T>({
  onSubmit,
}: UserFormSubmitComponentProps<T>) {
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
