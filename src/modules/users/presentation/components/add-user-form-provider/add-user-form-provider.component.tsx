'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'

import type { UserInterface } from '@/modules/users/domain/interfaces/user.interface'
import {
  AddUserFormSchema,
  type AddUserFormType
} from '../../schemas/add-user-form.schema'

interface AddUserFormContextProviderComponentProps {
  children: ReactNode
  isOpen: boolean
}

export function AddUserFormContextProviderComponent({
  children,
  isOpen
}: AddUserFormContextProviderComponentProps) {
  const randomId = Math.floor(Math.random() * 1000000)
  const defaultValues = useMemo<UserInterface>(
    () => ({
      login_name: '',
      name: '',
      email: '',
      company: '',
      position: '',
      password: '',
      files: [],
      passwd_reg_deadline: 30,
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
