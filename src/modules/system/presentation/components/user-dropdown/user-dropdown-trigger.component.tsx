import { DropdownMenuTrigger } from '@/modules/shared/presentation/components/shadcn/dropdown-menu'
import type { UserAccountInterface } from '.'
import {
  Avatar,
  AvatarFallback
} from '@/modules/shared/presentation/components/shadcn/avatar'
import { useInitialsFromText } from '../../hooks/use-initials-from-text.hook'
import { SidebarMenuButton } from '@/modules/shared/presentation/components/shadcn/sidebar'
import { ChevronsUpDown } from 'lucide-react'

interface UserDropdownTriggerComponentProps {
  user: UserAccountInterface
}

export function UserDropdownTriggerComponent({
  user: { name, email }
}: UserDropdownTriggerComponentProps) {
  const { getInitials } = useInitialsFromText()
  return (
    <DropdownMenuTrigger asChild>
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <Avatar className="h-9 w-9 rounded-lg">
          <AvatarFallback className="bg-primary-600 text-white text-[0.85rem] font-medium">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{name}</span>
          <span className="truncate text-xs">{email}</span>
        </div>
        <ChevronsUpDown className="ml-auto size-4" />
      </SidebarMenuButton>
    </DropdownMenuTrigger>
  )
}
