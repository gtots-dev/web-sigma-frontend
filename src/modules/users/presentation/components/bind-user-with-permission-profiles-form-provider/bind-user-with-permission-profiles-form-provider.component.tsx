'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import {
  BindUserWithPermissionProfileFormSchema,
  type BindUserWithPermissionProfileFormType
} from '../../schemas/bind-user-with-permission-profiles-form.schema'
import type { PermissionProfileWithUserInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-user.interface'

interface BindUserWithPermissionProfileFormContextProviderComponentProps {
  children: ReactNode
  permissionProfiles: PermissionProfileWithUserInterface[]
  isOpen: boolean
}

export function BindUserWithPermissionProfileFormContextProviderComponent({
  permissionProfiles,
  children,
  isOpen
}: BindUserWithPermissionProfileFormContextProviderComponentProps) {
  const defaultValues = useMemo<BindUserWithPermissionProfileFormType>(
    () => ({
      perm_profile_id: permissionProfiles.map(
        ({ perm_profile_id }) => perm_profile_id
      )
    }),
    [permissionProfiles]
  )

  const methods = useForm<BindUserWithPermissionProfileFormType>({
    resolver: zodResolver(BindUserWithPermissionProfileFormSchema),
    defaultValues
  })

  useEffect(() => {
    if (isOpen) {
      methods.reset(defaultValues)
    }
  }, [isOpen, defaultValues, methods])

  return <FormProvider {...methods}>{children}</FormProvider>
}
