'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import {
  AddLaneFormSchema,
  type AddLaneFormType
} from '../schemas/add-lane-form.schema'
import { useParams } from 'next/navigation'
import type { LaneEntity } from '../../domain/entities/lane.entity'

export function useAddLaneForm() {
  const { operationId, contractId, processingUnitId } = useParams()
  const defaultValues = useMemo<LaneEntity>(
    () => ({
      name: '',
      cfg: '',
      up_id: Number(processingUnitId),
      contract_id: Number(contractId),
      operation_id: Number(operationId)
    }),
    [operationId, contractId, processingUnitId]
  )

  const methods = useForm<AddLaneFormType>({
    resolver: zodResolver(AddLaneFormSchema),
    defaultValues
  })

  return {
    defaultValues,
    methods
  }
}
