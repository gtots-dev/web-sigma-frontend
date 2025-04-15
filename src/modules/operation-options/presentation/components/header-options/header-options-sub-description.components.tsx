'use client'

import { useSelectedOperation } from '@/modules/operations/presentation/hooks/use-get-selection-operation.hook'
import { Skeleton } from '@/modules/shared/presentation/components/shadcn/skeleton'
import type { ReactNode } from 'react'

interface HeaderOptionsSubDescriptionComponentProps {
  children: ReactNode
}

export function HeaderOptionsSubDescriptionComponent({
  children
}: HeaderOptionsSubDescriptionComponentProps) {
  const { name } = useSelectedOperation()

  return name ? (
    <p className="text-muted-foreground font-light">
      {children}
      <b className="text-primary-300 font-medium underline underline-offset-4 ml-1">
        {name}
      </b>
    </p>
  ) : (
    <Skeleton className="w-[250px] !h-[10px] mt-1.5 bg-white dark:bg-zinc-800 rounded-full" />
  )
}
