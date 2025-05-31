'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import { PasswordResetFormSchema } from '../../schemas/password-reset-form.schema'
import type { PasswordResetFormInterface } from '@/modules/password-reset/domain/interfaces/password-reset-form.interface'

interface PasswordResetFormContextProviderComponentProps {
  children: ReactNode
}

export function PasswordResetFormContextProviderComponent({
  children
}: PasswordResetFormContextProviderComponentProps) {
  const defaultValues = useMemo<PasswordResetFormInterface>(
    () => ({
      newPassword: '',
      passwordConfirm: ''
    }),
    []
  )

  const methods = useForm({
    resolver: zodResolver(PasswordResetFormSchema),
    defaultValues
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}
