'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import {
  PatchGroupStatusFormSchema,
  type PatchGroupStatusFormType
} from '../schemas/patch-group-status-form.schema'
import type { GroupEnableAndDisableInterface } from '../../domain/interfaces/group-enable-and-disable.interface'

export function usePatchGroupStatusForm(group: GroupEnableAndDisableInterface) {
  const defaultValues = useMemo<GroupEnableAndDisableInterface>(
    () => ({
      id: group.id,
      enabled: group.enabled
    }),
    [group]
  )

  const methods = useForm<PatchGroupStatusFormType>({
    resolver: zodResolver(PatchGroupStatusFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
