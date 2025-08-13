'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import {
  PutUserStatusFormSchema,
  type PutUserStatusFormType
} from '../../schemas/put-user-status-form.schema'

interface PutUserStatusFormContextProviderComponentProps {
  children: ReactNode
  user: UserEntity
  isOpen: boolean
}

export function PutUserStatusFormContextProviderComponent({
  children,
  user,
  isOpen
}: PutUserStatusFormContextProviderComponentProps) {
  const defaultValues = useMemo<{ userId: number; enabled: boolean }>(
    () => ({
      userId: user.id,
      enabled: user.enabled
    }),
    [user?.id]
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
