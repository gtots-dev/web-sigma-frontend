'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useFormContext } from 'react-hook-form'
import { useAuthenticationFormSubmitHook } from '../../hooks/use-authentication-form-submit.hook'
import type { AuthenticationFormType } from '../../schemas/authentication-form.schema'

export function AuthenticationFormInputSubmitComponent() {
  const { handleSubmit } = useFormContext<AuthenticationFormType>()
  const { onSubmit } = useAuthenticationFormSubmitHook()
  return (
    <Button
      className="w-full text-sm bg-primary-600 text-zinc-50 hover:bg-primary-600/90"
      type="submit"
      onClick={handleSubmit(onSubmit)}
    >
      Acessar
    </Button>
  )
}
