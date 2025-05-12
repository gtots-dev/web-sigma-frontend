'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import {
  AddUserFormSchema,
  type AddUserFormType
} from '../../schemas/add-user-form.schema'
import type { UserWithFiles } from '@/modules/users/domain/types/user-with-files'

interface AddUserFormContextProviderComponentProps {
  children: ReactNode
  isOpen: boolean
}

export function AddUserFormContextProviderComponent({
  children,
  isOpen
}: AddUserFormContextProviderComponentProps) {
  const defaultValues = useMemo<UserWithFiles>(
    () => ({
      login_name: '',
      name: '',
      email: '',
      company: '',
      position: '',
      password: '',
      files: [],
      days_passwd_reg_deadline: 30,
      description: ''
    }),
    []
  )

  const methods = useForm<AddUserFormType>({
    resolver: zodResolver(AddUserFormSchema),
    defaultValues
  })

  useEffect(() => {
    if (isOpen) {
      methods.reset(defaultValues)
    }
  }, [isOpen, defaultValues, methods])

  return <FormProvider {...methods}>{children}</FormProvider>
}
