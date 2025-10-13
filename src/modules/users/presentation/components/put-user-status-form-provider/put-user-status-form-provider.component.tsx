'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import {
  PutUserStatusFormSchema,
  type PutUserStatusFormType
} from '../../schemas/put-user-status-form.schema'
import type { UserEnableAndDisableInterface } from '@/modules/users/domain/interfaces/user-enable-and-disable.interface'

interface PutUserStatusFormContextProviderComponentProps {
  children: ReactNode
  user: UserEnableAndDisableInterface
  isOpen: boolean
}

export function PutUserStatusFormContextProviderComponent({
  children,
  user,
  isOpen
}: PutUserStatusFormContextProviderComponentProps) {
  const defaultValues = useMemo<UserEnableAndDisableInterface>(
    () => ({
      id: user.id,
      enabled: user.enabled
    }),
    [user]
  )

  const methods = useForm<PutUserStatusFormType>({
    resolver: zodResolver(PutUserStatusFormSchema),
    defaultValues
  })

  useEffect(() => {
    if (isOpen) {
      methods.reset(defaultValues)
    }
  }, [isOpen, defaultValues, methods])

  return <FormProvider {...methods}>{children}</FormProvider>
}
