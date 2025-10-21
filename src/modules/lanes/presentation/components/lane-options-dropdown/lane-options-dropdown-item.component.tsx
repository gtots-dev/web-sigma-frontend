'use client'

import { DropdownMenuItem } from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import type { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu'
import type { ReactNode } from 'react'

interface LaneOptionsDropdownItemComponentProps extends DropdownMenuItemProps {
  children?: ReactNode
}

export function LaneOptionsDropdownItemComponent({
  children,
  ...props
}: LaneOptionsDropdownItemComponentProps) {
  return (
    <DropdownMenuItem className="p-0" {...props}>
      {children} 
    </DropdownMenuItem>
  )
}
