import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import type { SidebarSystemItemComponentProps } from '.'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/modules/shared/presentation/components/shadcn/collapsible'
import {
  SidebarMenuSubItem,
  SidebarMenuSub
} from '@/modules/shared/presentation/components/shadcn/sidebar'
import { useSidebarSystemItem } from '../../hooks/use-sidebar-system-item.hook'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'

export function SidebarSystemItemGrandchildComponent({
  item,
  activePath
}: SidebarSystemItemComponentProps) {
  const { handleClick, isActive } = useSidebarSystemItem(item)
  const [isOpen, setIsOpen] = useState(true)

  const buttonClassNames = clsx(
    'flex h-7 w-full mb-1 min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 [&>span:last-child]:truncate [&>svg]:size-4 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ',
    {
      'disabled:opacity-100 bg-primary-600 text-white [&>svg]:text-white hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white active:bg-primary-600 active:text-white':
        isActive,
      'hover:underline hover:underline-offset-2 cursor-pointer': !isActive
    }
  )

  const rotateArrowClassNames = clsx(
    'ml-auto transition-transform duration-200 h-5 w-5 hover:opacity-50',
    {
      'rotate-90': isOpen
    }
  )

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="h-full">
      <SidebarMenuSubItem className="w-full">
        <div className={buttonClassNames}>
          <Button className='justify-start w-full px-0 hover:bg-transparent disabled:opacity-100' variant="ghost" disabled={isActive} onClick={handleClick}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </Button>
          <CollapsibleTrigger className="group aspect-square">
            {item.items && <ChevronRight className={rotateArrowClassNames} />}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="h-full">
          {item.items && (
            <SidebarMenuSub className="h-full !me-0 pe-0">
              {item.items.map((subItem) => (
                <SidebarSystemItemGrandchildComponent
                  key={subItem.title}
                  item={subItem}
                  activePath={activePath}
                />
              ))}
            </SidebarMenuSub>
          )}
        </CollapsibleContent>
      </SidebarMenuSubItem>
    </Collapsible>
  )
}
