import { DropdownMenu } from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import type { ReactNode } from 'react'

interface VehiclesTypesOptionsDropdownRootComponentProps extends DropdownMenuProps {
  children: ReactNode
}

export function VehiclesTypesOptionsDropdownRootComponent({
  children,
  ...props
}: VehiclesTypesOptionsDropdownRootComponentProps) {
  return <DropdownMenu {...props}>{children}</DropdownMenu>
}
