'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import {
  AddPermissionProfilesFormSchema,
  type AddPermissionProfileFormType
} from '../../schemas/add-permission-profile-form.schema'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'

interface AddPermissionProfileFormContextProviderComponentProps {
  children: ReactNode
  isOpen: boolean
}

export function AddPermissionProfileFormContextProviderComponent({
  children,
  isOpen
}: AddPermissionProfileFormContextProviderComponentProps) {
  const defaultValues = useMemo<PermissionProfileInterface>(
    () => ({
      name: '',
      description: ''
    }),
    []
  )

  const methods = useForm<AddPermissionProfileFormType>({
    resolver: zodResolver(AddPermissionProfilesFormSchema),
    defaultValues
  })

  useEffect(() => {
    if (isOpen) {
      methods.reset(defaultValues)
    }
  }, [isOpen, defaultValues, methods])

  return <FormProvider {...methods}>{children}</FormProvider>
}
