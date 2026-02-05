'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import type { UserEntity } from '../../domain/entities/user.entity'
import {
  PatchUserFormSchema,
  type PatchUserFormType
} from '../schemas/patch-user-form.schema'

export function usePatchUserForm(user: UserEntity) {
  const defaultValues = useMemo<UserEntity>(
    () => ({
      id: user?.id,
      login_name: user?.login_name,
      name: user?.name,
      email: user?.email,
      files: [],
      company: user?.company ?? '',
      position: user?.position ?? '',
      description: user?.description ?? ''
    }),
    [user]
  )

  const methods = useForm<PatchUserFormType>({
    resolver: zodResolver(PatchUserFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
