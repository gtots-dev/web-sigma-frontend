import { DropdownMenu } from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import type { ReactNode } from 'react'

interface UserDropdownRootComponentProps {
  children: ReactNode
}

export function UserDropdownRootComponent({
  children
}: UserDropdownRootComponentProps) {
  return <DropdownMenu>{children}</DropdownMenu>
}
