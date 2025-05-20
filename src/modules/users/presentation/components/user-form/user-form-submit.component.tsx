'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import type { UserWithFiles } from '@/modules/users/domain/types/user-with-files'
import { useFormContext } from 'react-hook-form'

interface UserFormSubmitComponentProps {
  onSubmit: (user: UserWithFiles) => void
}

export function UserFormSubmitComponent({
  onSubmit
}: UserFormSubmitComponentProps) {
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
