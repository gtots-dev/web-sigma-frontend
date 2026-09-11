import type { ComponentProps } from 'react'
import { cn } from '@/modules/shared/presentation/lib/utils'

export interface HeaderSectionTitleComponentProps extends ComponentProps<'h1'> {}

export function HeaderSectionTitleComponent({
  className,
  children,
  ...props
}: HeaderSectionTitleComponentProps) {
  return (
    <h1
      className={cn(
        'text-base sm:text-lg font-semibold text-foreground tracking-tight min-w-0 truncate',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
}
