'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import {
  PatchPermissionProfileStatusFormSchema,
  type PatchPermissionProfileStatusFormType
} from '../../schemas/put-user-permission-profile-form.schema'
import type { PermissionProfileEnableAndDisableInterface } from '@/modules/permissions/domain/interfaces/permission-profile-enable-and-disable.interface'

interface PatchPermissionProfileStatusFormContextProviderComponentProps {
  children: ReactNode
  permissionProfile: PermissionProfileEnableAndDisableInterface
  isOpen: boolean
}

export function PatchPermissionProfileStatusFormContextProviderComponent({
  children,
  permissionProfile,
  isOpen
}: PatchPermissionProfileStatusFormContextProviderComponentProps) {
  const defaultValues = useMemo<PermissionProfileEnableAndDisableInterface>(
    () => ({
      id: permissionProfile.id,
      enabled: permissionProfile?.enabled
    }),
    [permissionProfile]
  )

  const methods = useForm<PatchPermissionProfileStatusFormType>({
    resolver: zodResolver(PatchPermissionProfileStatusFormSchema),
    defaultValues
  })

  useEffect(() => {
    if (isOpen) {
      methods.reset(defaultValues)
    }
  }, [isOpen, defaultValues, methods])

  return <FormProvider {...methods}>{children}</FormProvider>
}
