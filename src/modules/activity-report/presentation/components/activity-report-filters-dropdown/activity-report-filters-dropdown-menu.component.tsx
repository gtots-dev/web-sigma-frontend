'use client'

import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import type { ReactNode } from 'react'

interface ActivityReportFiltersDropdownMenuComponentProps
  extends DropdownMenuContentProps {
  children: ReactNode
}

export function ActivityReportFiltersDropdownMenuComponent({
  children,
  ...props
}: ActivityReportFiltersDropdownMenuComponentProps) {
  return (
    <DropdownMenuContent
      className="w-[400px] h-[400px] min-w-56 rounded-lg"
      side="left"
      align="start"
      sideOffset={4}
      {...props}
    >
      <DropdownMenuLabel className="font-normal p-1.5">
        Filtros
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      {children}
    </DropdownMenuContent>
  )
}
