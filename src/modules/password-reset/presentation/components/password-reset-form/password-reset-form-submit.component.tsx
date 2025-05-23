'use client'

import type { PasswordResetFormInterface } from '@/modules/password-reset/domain/interfaces/password-reset.interface'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useFormContext } from 'react-hook-form'

interface PasswordResetFormSubmitComponentProps {
  onSubmit: (Passwords: PasswordResetFormInterface) => void
}

export function PasswordResetFormSubmitComponent({
  onSubmit
}: PasswordResetFormSubmitComponentProps) {
  const { handleSubmit } = useFormContext()

  return (
    <Button
      className="w-full"
      variant="primary"
      onClick={handleSubmit(onSubmit)}
    >
      Confirmar
    </Button>
  )
}
