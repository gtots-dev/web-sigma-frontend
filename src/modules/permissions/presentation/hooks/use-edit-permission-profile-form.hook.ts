'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import {
  EditPermissionProfilesFormSchema,
  type EditPermissionProfileFormType
} from '../schemas/edit-permission-profile-form.schema'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'
import type { PermissionProfileWithFeatureInterface } from '../../domain/interfaces/permission-profile-with-feature.interface'

export function useEditPermissionProfileForm(
  profile: PermissionProfileInterface,
  features: PermissionProfileWithFeatureInterface[]
) {
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

  return {
    defaultValues,
    methods
  }
}
