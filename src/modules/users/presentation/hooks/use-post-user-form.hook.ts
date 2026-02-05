'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import type { UserEntity } from '../../domain/entities/user.entity'
import {
  PostUserFormSchema,
  type PostUserFormType
} from '../schemas/post-user-form.schema'

export function usePostUserForm() {
  const defaultValues = useMemo<UserEntity>(
    () => ({
      login_name: '',
      name: '',
      email: '',
      company: '',
      position: '',
      files: [],
      days_passwd_reg_deadline: 30,
      description: ''
    }),
    []
  )

  const methods = useForm<PostUserFormType>({
    resolver: zodResolver(PostUserFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
