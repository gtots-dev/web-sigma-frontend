import type { ComponentProps } from 'react'
import Link from 'next/link'
import { Button } from '../shadcn/button'
import { CornerUpLeft } from 'lucide-react'
import { cn } from '@/modules/shared/presentation/lib/utils'

export interface SectionRedirectLinkButtonComponentProps extends ComponentProps<
  typeof Button
> {
  href: string
}

export function SectionRedirectLinkButtonComponent({
  className,
  href,
  variant = 'outline',
  children,
  ...props
}: SectionRedirectLinkButtonComponentProps) {
  return (
    <Button
      className={cn(
        'h-auto w-full lg:!w-9 lg:!aspect-square self-stretch',
        className
      )}
      variant={variant}
      asChild
      {...props}
    >
      <Link href={href} aria-label="Voltar">
        {children ?? (
          <>
            <CornerUpLeft className="w-4 h-4" />
            <span className="md:hidden">Voltar</span>
          </>
        )}
      </Link>
    </Button>
  )
}
