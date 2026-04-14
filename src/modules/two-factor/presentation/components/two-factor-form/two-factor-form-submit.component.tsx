'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useFormContext } from 'react-hook-form'
import type { TwoFactorInterface } from '@/modules/two-factor/domain/interfaces/two-factor.interface'
import { ErrorMessageComponent } from '@/modules/shared/presentation/components/error-message/error-message.component'
import { LoadingSpinComponent } from '@/modules/shared/presentation/components/loading-spin/loading-spin.component'

interface TwoFactorFormSubmitComponentProps {
  onSubmit: (twoFactor: TwoFactorInterface) => Promise<void>
  error?: string
}

export function TwoFactorFormSubmitComponent({
  onSubmit,
  error
}: TwoFactorFormSubmitComponentProps) {
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = useFormContext<TwoFactorInterface>()

  return (
    <div className="flex flex-col gap-y-3 w-full">
      <ErrorMessageComponent error={error} />

      <Button
        disabled={isSubmitting}
        className="w-full text-sm bg-primary-600 text-zinc-50 hover:bg-primary-600/90"
        type="submit"
        onClick={handleSubmit(onSubmit)}
      >
        <LoadingSpinComponent loading={isSubmitting} />
        Autenticar
      </Button>
    </div>
  )
}
