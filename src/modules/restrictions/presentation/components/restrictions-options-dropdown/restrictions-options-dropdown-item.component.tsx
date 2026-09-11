'use client'

import { DropdownMenuItem } from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import type { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu'
import type { ReactNode } from 'react'

interface RestrictionsOptionsDropdownItemComponentProps extends DropdownMenuItemProps {
  children?: ReactNode
}

export function RestrictionsOptionsDropdownItemComponent({
  children,
  ...props
}: RestrictionsOptionsDropdownItemComponentProps) {
  return (
    <DropdownMenuItem className="p-0" {...props}>
      {children}
    </DropdownMenuItem>
  )
}
