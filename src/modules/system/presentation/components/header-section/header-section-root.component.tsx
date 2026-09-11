import type { ComponentProps } from 'react'
import { cn } from '@/modules/shared/presentation/lib/utils'

export interface HeaderSectionRootComponentProps extends ComponentProps<'header'> {}

export function HeaderSectionRootComponent({
  className,
  children,
  ...props
}: HeaderSectionRootComponentProps) {
  return (
    <header
      className={cn(
        'flex flex-row items-center p-3.5 sm:p-5 gap-3 sm:gap-4 min-w-0 w-full bg-card/70 backdrop-blur-md border border-border/60 shadow-xs rounded-xl transition-all duration-300 group flex-wrap sm:flex-nowrap',
        className
      )}
      {...props}
    >
      {children}
    </header>
  )
}
