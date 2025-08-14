'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import {
  PutPermissionProfileStatusFormSchema,
  type PutPermissionProfileStatusFormType
} from '../../schemas/put-user-permission-profile-form.schema'
import type { PermissionProfileEnableAndDisableInterface } from '@/modules/permissions/domain/interfaces/permission-profile-enable-and-disable.interface'

interface PutPermissionProfileStatusFormContextProviderComponentProps {
  children: ReactNode
  permissionProfile: PermissionProfileEnableAndDisableInterface
  isOpen: boolean
}

export function PutPermissionProfileStatusFormContextProviderComponent({
  children,
  permissionProfile,
  isOpen
}: PutPermissionProfileStatusFormContextProviderComponentProps) {
  const defaultValues = useMemo<PermissionProfileEnableAndDisableInterface>(
    () => ({
      id: permissionProfile.id,
      enabled: permissionProfile?.enabled
    }),
    [permissionProfile]
  )

  const methods = useForm<PutPermissionProfileStatusFormType>({
    resolver: zodResolver(PutPermissionProfileStatusFormSchema),
    defaultValues
  })

  useEffect(() => {
    if (isOpen) {
      methods.reset(defaultValues)
    }
  }, [isOpen, defaultValues, methods])

  return <FormProvider {...methods}>{children}</FormProvider>
}
