'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import {
  PatchPermissionProfileStatusFormSchema,
  type PatchPermissionProfileStatusFormType
} from '../schemas/put-user-permission-profile-form.schema'
import type { PermissionProfileEnableAndDisableInterface } from '../../domain/interfaces/permission-profile-enable-and-disable.interface'

export function usePatchPermissionProfileStatusForm(
  permissionProfile: PermissionProfileEnableAndDisableInterface
) {
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

  return {
    defaultValues,
    methods
  }
}
