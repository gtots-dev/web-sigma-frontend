'use client'

import type { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu'
import type { ReactNode } from 'react'

interface ActivityReportFiltersDropdownItemComponentProps
  extends DropdownMenuItemProps {
  children?: ReactNode
}

export function ActivityReportFiltersDropdownItemComponent({
  children
}: ActivityReportFiltersDropdownItemComponentProps) {
  return <>{ children }</>
}
