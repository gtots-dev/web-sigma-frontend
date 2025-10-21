'use client'

import { DropdownMenuItem } from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import type { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu'
import type { ReactNode } from 'react'

interface ProcessingUnitsOptionsDropdownItemComponentProps extends DropdownMenuItemProps {
  children?: ReactNode
}

export function ProcessingUnitsOptionsDropdownItemComponent({
  children,
  ...props
}: ProcessingUnitsOptionsDropdownItemComponentProps) {
  return (
    <DropdownMenuItem className="p-0" {...props}>
      {children} 
    </DropdownMenuItem>
  )
}
