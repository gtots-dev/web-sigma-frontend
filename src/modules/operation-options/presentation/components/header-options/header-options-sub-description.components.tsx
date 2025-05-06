'use client'

import { Skeleton } from '@/modules/shared/presentation/components/shadcn/skeleton'
import { useOperationStore } from '@/modules/system/presentation/store/operation.store'
import { ReactNode } from 'react'

interface HeaderOptionsSubDescriptionComponentProps {
  children: ReactNode
}

export function HeaderOptionsSubDescriptionComponent({
  children
}: HeaderOptionsSubDescriptionComponentProps) {
  const { operation } = useOperationStore()

  return operation.id && operation.name ? (
    <p className="text-muted-foreground font-light">
      {children}
      <b className="text-primary-300 font-medium underline underline-offset-4 ml-1">
        {operation.name}
      </b>
    </p>
  ) : (
    <Skeleton className="w-[250px] !h-[10px] mt-1.5 rounded-full" />
  )
}
