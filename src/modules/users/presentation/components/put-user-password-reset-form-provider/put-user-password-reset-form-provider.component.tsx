'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import {
  PutUserPasswordResetFormSchema,
  type PutUserPasswordResetFormType
} from '../../schemas/put-user-password-reset-form.schema'
import type { UserPasswordResetInterface } from '@/modules/users/domain/interfaces/user-password-reset.interface'

interface PutUserPasswordResetFormContextProviderComponentProps {
  children: ReactNode
  isOpen: boolean
}

export function PutUserPasswordResetFormContextProviderComponent({
  children,
  isOpen
}: PutUserPasswordResetFormContextProviderComponentProps) {
  const defaultValues = useMemo<UserPasswordResetInterface>(
    () => ({
      days_passwd_reg_deadline: 30
    }),
    []
  )

  const methods = useForm<PutUserPasswordResetFormType>({
    resolver: zodResolver(PutUserPasswordResetFormSchema),
    defaultValues
  })

  useEffect(() => {
    if (isOpen) {
      methods.reset(defaultValues)
    }
  }, [isOpen, defaultValues, methods])

  return <FormProvider {...methods}>{children}</FormProvider>
}
