import { useEffect, type ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { usePostTwoFactorForm } from '../../hooks/use-post-two-factor-form.hook'

interface TwoFactorFormCardRootComponentProps {
  children: ReactNode
}

export function TwoFactorFormCardRootComponent({
  children
}: TwoFactorFormCardRootComponentProps) {
  const { methods, defaultValues } = usePostTwoFactorForm()

  useEffect(() => {
    methods.reset(defaultValues)
  }, [defaultValues, methods])

  return (
    <div className="flex flex-col gap-6">
      <FormProvider {...methods}>{children}</FormProvider>
    </div>
  )
}
