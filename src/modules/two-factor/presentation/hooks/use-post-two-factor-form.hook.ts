'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import { TwoFactorFormSchema } from '../schemas/two-factor-form.schema'
import type { TwoFactorInterface } from '../../domain/interfaces/two-factor.interface'

export function usePostTwoFactorForm() {
  const defaultValues = useMemo<TwoFactorInterface>(
    () => ({
      otp_code: ''
    }),
    []
  )

  const methods = useForm({
    resolver: zodResolver(TwoFactorFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
