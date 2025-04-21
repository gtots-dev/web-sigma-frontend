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
  const defaultValues = useMemo<UserInterface>(() => ({
    login_name: "lucas_martinez",
    name: "Lucas Martinez",
    email: "lucas.martinez@gtots.com.br",
    company: "gtots",
    position: "Desenvolvedor",
    password: "123"
  }), [])

  const methods = useForm<AddUserFormType>({
    resolver: zodResolver(AddUserFormSchema),
    defaultValues
  })

  useEffect(() => {
    if (isOpen) {
      methods.reset(defaultValues)
    }
  }, [isOpen, defaultValues, methods])

  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  )
}
