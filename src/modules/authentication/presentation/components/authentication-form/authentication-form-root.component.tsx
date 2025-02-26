'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  AuthenticationFormSchema,
  type AuthenticationFormType
} from '@/modules/authentication/presentation/schemas/authentication-form.schema'
import { useForm, FormProvider } from 'react-hook-form'
import type { ReactNode } from 'react'

interface AuthenticationFormRootComponentProps {
  children: ReactNode
}

export function AuthenticationFormRootComponent({
  children
}: AuthenticationFormRootComponentProps) {
  const defaultValues: AuthenticationFormType = {
    username: '',
    password: ''
  }

  const methods = useForm<AuthenticationFormType>({
    resolver: zodResolver(AuthenticationFormSchema),
    defaultValues
  })

  return (
    <FormProvider {...methods}>
      <form>{children}</form>
    </FormProvider>
  )
}
