'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import {
  EditPermissionProfilesFormSchema,
  type EditPermissionProfileFormType
} from '../../schemas/edit-permission-profile-form.schema'
import type { PermissionProfileWithFeatureInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-feature.interface'

interface EditPermissionProfileFormContextProviderComponentProps {
  children: ReactNode
  profile: PermissionProfileInterface
  features: PermissionProfileWithFeatureInterface[]
  isOpen: boolean
}

export function EditPermissionProfileFormContextProviderComponent({
  children,
  profile,
  features,
  isOpen
}: EditPermissionProfileFormContextProviderComponentProps) {
  const defaultValues = useMemo<PermissionProfileInterface>(
    () => ({
      id: profile.id,
      name: profile.name,
      description: profile.description,
      features: features.map(({ feature_id }) => feature_id)
    }),
    [profile, features]
  )

  const methods = useForm<EditPermissionProfileFormType>({
    resolver: zodResolver(EditPermissionProfilesFormSchema),
    defaultValues
  })

  useEffect(() => {
    if (isOpen) {
      methods.reset(defaultValues)
    }
  }, [isOpen, defaultValues, methods])

  return <FormProvider {...methods}>{children}</FormProvider>
}
