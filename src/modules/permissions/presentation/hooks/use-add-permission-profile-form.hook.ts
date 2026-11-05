'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import {
  AddPermissionProfilesFormSchema,
  type AddPermissionProfileFormType
} from '../schemas/add-permission-profile-form.schema'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'

export function useAddPermissionProfileForm() {
  const defaultValues = useMemo<PermissionProfileInterface>(
    () => ({
      name: '',
      description: '',
      features: []
    }),
    []
  )

  const methods = useForm<AddPermissionProfileFormType>({
    resolver: zodResolver(AddPermissionProfilesFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
