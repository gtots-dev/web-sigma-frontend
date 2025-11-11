'use client'

import { Skeleton } from '@/modules/shared/presentation/components/shadcn/skeleton'
import { ReactNode } from 'react'

interface HeaderOptionsSubDescriptionComponentProps {
  children: ReactNode
  name: string
}

export function HeaderOptionsSubDescriptionComponent({
  children,
  name
}: HeaderOptionsSubDescriptionComponentProps) {
  return name ? (
    <p className="text-muted-foreground font-light">
      {children}
      <b className="text-primary-300 font-medium underline underline-offset-4 ml-1">
        {name}
      </b>
    </p>
  ) : (
    <Skeleton className="w-[250px] !h-[10px] mt-1.5 rounded-full" />
  )
}
