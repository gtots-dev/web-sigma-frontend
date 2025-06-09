'use client'

import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import type { ReactNode } from 'react'

interface UserOptionsDropdownMenuComponentProps
  extends DropdownMenuContentProps {
  children: ReactNode
}

export function UserOptionsDropdownMenuComponent({
  children,
  ...props
}: UserOptionsDropdownMenuComponentProps) {
  return (
    <DropdownMenuContent
      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
      side="left"
      align="start"
      sideOffset={4}
      {...props}
    >
      <DropdownMenuLabel className="font-normal p-1.5">
        Opções
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      {children}
    </DropdownMenuContent>
  )
}
