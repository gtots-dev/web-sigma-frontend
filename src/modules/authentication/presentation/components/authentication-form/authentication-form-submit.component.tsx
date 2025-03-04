'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ErrorMessageComponent } from '@/modules/shared/presentation/components/error-message/error-message.component'
import { useFormContext } from 'react-hook-form'
import { useAuthenticationFormSubmitHook } from '../../hooks/use-authentication-form-submit.hook'
import type { AuthenticationFormType } from '../../schemas/authentication-form.schema'
import { LoadingSpinComponent } from '@/modules/shared/presentation/components/loading-spin/loading-spin.component'

export function AuthenticationFormInputSubmitComponent() {
  const { handleSubmit } = useFormContext<AuthenticationFormType>()
  const { onSubmitSignIn, loading, error } = useAuthenticationFormSubmitHook()
  return (
    <div className="flex flex-col gap-y-3">
      <ErrorMessageComponent error={error} />
      <Button
        disabled={loading}
        className="w-full text-sm bg-primary-600 text-zinc-50 hover:bg-primary-600/90"
        type="submit"
        onClick={handleSubmit(onSubmitSignIn)}
      >
        <LoadingSpinComponent loading={loading} />
        Acessar
      </Button>
    </div>
  )
}
