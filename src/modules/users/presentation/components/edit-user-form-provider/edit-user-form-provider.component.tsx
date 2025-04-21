import { useForm, FormProvider } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import type { UserInterface } from '@/modules/users/domain/interfaces/user.interface'
import {
  EditUserFormSchema,
  type EditUserFormType
} from '../../schemas/edit-user-form.schema'

interface EditUserFormContextProviderComponentProps {
  children: ReactNode
  user?: UserInterface
  isOpen: boolean
}

export function EditUserFormContextProviderComponent({
  children,
  isOpen,
  user
}: EditUserFormContextProviderComponentProps) {
  const defaultValues = useMemo<Partial<UserInterface>>(
    () => ({
      id: user?.id,
      login_name: user?.login_name,
      name: user?.name,
      email: user?.email,
      company: user?.company,
      position: user?.position,
      password: user?.password
    }),
    [user]
  )

  const methods = useForm<EditUserFormType>({
    resolver: zodResolver(EditUserFormSchema),
    defaultValues
  })

  useEffect(() => {
    if (isOpen) {
      methods.reset(defaultValues)
    }
  }, [isOpen, defaultValues, methods])

  return <FormProvider {...methods}>{children}</FormProvider>
}
