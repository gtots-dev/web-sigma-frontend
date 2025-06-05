import { cn } from '@/modules/shared/presentation/lib/utils'
import Image from 'next/image'

interface ThemeLogoComponentProps {
  logoLightSrc: string
  logoLightAlt: string
  logoDarkSrc: string
  logoDarkAlt: string
  className?: string
  isMobileOnly?: boolean
}

export function ThemeLogoComponent({
  logoLightSrc,
  logoLightAlt,
  logoDarkSrc,
  logoDarkAlt,
  className,
  isMobileOnly = false
}: ThemeLogoComponentProps) {
  return (
    <picture>
      {['light', 'dark'].map((mode) => (
        <Image
          key={mode}
          src={mode === 'light' ? logoLightSrc : logoDarkSrc}
          alt={mode === 'light' ? logoLightAlt : logoDarkAlt}
          className={cn(
            'aspect-auto',
            mode === 'light' ? 'dark:!hidden' : 'dark:!block grayscale !hidden',
            className,
            isMobileOnly ? 'block sm:hidden' : 'sm:block'
          )}
          fetchPriority="high"
        />
      ))}
    </picture>
  )
}
