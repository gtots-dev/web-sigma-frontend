import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import type { SidebarSystemItemComponentProps } from '.'
import {
  Collapsible,
  CollapsibleTrigger
} from '@/modules/shared/presentation/components/shadcn/collapsible'
import {
  SidebarMenuSubItem,
  SidebarMenuSub
} from '@/modules/shared/presentation/components/shadcn/sidebar'
import { useSidebarSystemItem } from '../../hooks/use-sidebar-system-item.hook'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { cn } from '@/modules/shared/presentation/lib/utils'

const variants = {
  open: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
  closed: { opacity: 0, height: 0, transition: { duration: 0.3 } }
}

export function SidebarSystemItemGrandchildComponent({
  item,
  activePath,
  className
}: SidebarSystemItemComponentProps) {
  const { handleClick, isActive } = useSidebarSystemItem(item)
  const [isOpen, setIsOpen] = useState(true)

  const sidebarButtonClass = clsx(
    'flex h-7 w-full min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 [&>span:last-child]:truncate [&>svg]:size-4',
    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
    isActive
      ? 'bg-primary-600 text-white [&>svg]:text-white hover:!bg-primary-600 hover:!text-white dark:hover:!bg-primary-600 dark:hover:!text-white active:bg-primary-600 active:text-white'
      : 'hover:underline hover:underline-offset-2 cursor-pointer'
  )

  const rotateArrowClassNames = clsx(
    'ml-auto transition-transform duration-200 h-4 w-4 hover:opacity-50',
    { 'rotate-90': isOpen }
  )

  return (
    <>
      {item.isActive && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <SidebarMenuSubItem>
            <div className={cn(sidebarButtonClass, className)}>
              {item.items && item.isToExpand && (
                <CollapsibleTrigger className="group aspect-square">
                  <ChevronRight className={rotateArrowClassNames} />
                </CollapsibleTrigger>
              )}
              <Button
                className="overflow-hidden justify-start w-full h-7 px-0 py-0 disabled:opacity-100"
                variant="ghost"
                disabled={isActive}
                onClick={handleClick}
              >
                {item.icon && <item.icon className="!h-3.5 !w-3.5" />}
                <span className="truncate" title={item.title}>
                  {item.title}
                </span>
              </Button>
            </div>
            {item.items && (
              <motion.div
                initial="closed"
                animate={isOpen ? 'open' : 'closed'}
                variants={variants}
                className="overflow-hidden"
              >
                <SidebarMenuSub className="h-full !me-0 pe-0">
                  {item.items.map((subItem) => (
                    <SidebarSystemItemGrandchildComponent
                      key={subItem.title}
                      item={subItem}
                      activePath={activePath}
                    />
                  ))}
                </SidebarMenuSub>
              </motion.div>
            )}
          </SidebarMenuSubItem>
        </Collapsible>
      )}
    </>
  )
}
