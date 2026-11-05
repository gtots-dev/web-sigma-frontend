'use client'

import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  PatchUserStatusFormSchema,
  type PatchUserStatusFormType
} from '../schemas/patch-user-status-form.schema'
import type { UserEnableAndDisableInterface } from '@/modules/users/domain/interfaces/user-enable-and-disable.interface'

export function usePatchUserStatusForm(user: UserEnableAndDisableInterface) {
  const defaultValues = useMemo<UserEnableAndDisableInterface>(
    () => ({
      id: user.id,
      enabled: user.enabled
    }),
    [user]
  )

  const methods = useForm<PatchUserStatusFormType>({
    resolver: zodResolver(PatchUserStatusFormSchema),
    defaultValues
  })

  useEffect(() => {
    methods.reset(defaultValues)
  }, [defaultValues, methods])

  return methods
}
