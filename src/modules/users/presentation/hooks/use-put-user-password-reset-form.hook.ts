'use client'

import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  PutUserPasswordResetFormSchema,
  type PutUserPasswordResetFormType
} from '../schemas/put-user-password-reset-form.schema'
import type { UserPasswordResetInterface } from '@/modules/users/domain/interfaces/user-password-reset.interface'

export function usePutUserPasswordResetForm() {
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
    methods.reset(defaultValues)
  }, [defaultValues, methods])

  return methods
}
