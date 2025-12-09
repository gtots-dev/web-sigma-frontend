'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'

import type { GroupEntity } from '../../domain/entities/group.entity'
import {
  PatchGroupFormSchema,
  type PatchGroupFormType
} from '../schemas/patch-group-form.schema'

export function usePatchGroupForm(group: GroupEntity) {
  const defaultValues = useMemo<GroupEntity>(
    () => ({
      id: group.id,
      name: group.name ?? '',
      description: group?.description ?? '',
      cfg: JSON.stringify(group.cfg === null ? {} : group.cfg)
    }),
    [group]
  )

  const methods = useForm<PatchGroupFormType>({
    resolver: zodResolver(PatchGroupFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
