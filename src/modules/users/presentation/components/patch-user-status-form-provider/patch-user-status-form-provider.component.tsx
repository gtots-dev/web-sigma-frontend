'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import {
  PatchUserStatusFormSchema,
  type PatchUserStatusFormType
} from '../../schemas/patch-user-status-form.schema'
import type { UserEnableAndDisableInterface } from '@/modules/users/domain/interfaces/user-enable-and-disable.interface'

interface PatchUserStatusFormContextProviderComponentProps {
  children: ReactNode
  user: UserEnableAndDisableInterface
  isOpen: boolean
}

export function PatchUserStatusFormContextProviderComponent({
  children,
  user,
  isOpen
}: PatchUserStatusFormContextProviderComponentProps) {
  const defaultValues = useMemo<UserEnableAndDisableInterface>(
    () => ({
      id: user.id,
      enabled: user.enabled
    }),
    [user]
  )

  const methods = useForm<PatchUserStatusFormType>({
    resolver: zodResolver(PatchUserStatusFormSchema),
    defaultValues
  })

  useEffect(() => {
    if (isOpen) {
      methods.reset(defaultValues)
    }
  }, [isOpen, defaultValues, methods])

  return <FormProvider {...methods}>{children}</FormProvider>
}
