'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import {
  PutPermissionProfileStatusFormSchema,
  type PutPermissionProfileStatusFormType
} from '../../schemas/put-user-permission-profile-form.schema'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'

interface PutPermissionProfileStatusFormContextProviderComponentProps {
  children: ReactNode
  permissionProfile: PermissionProfileEntity
  isOpen: boolean
}

export function PutPermissionProfileStatusFormContextProviderComponent({
  children,
  permissionProfile,
  isOpen
}: PutPermissionProfileStatusFormContextProviderComponentProps) {
  const defaultValues = useMemo<{
    permissionProfileId: number
    enabled: boolean
  }>(
    () => ({
      permissionProfileId: permissionProfile.id,
      enabled: permissionProfile?.enabled
    }),
    [permissionProfile?.id]
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
