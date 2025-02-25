import { cn } from '@/modules/shared/presentation/lib/utils'

interface AuthenticationCardThemeLogoComponentProps {
  logoLightSrc: string
  logoLightAlt: string
  logoDarkSrc: string
  logoDarkAlt: string
  className?: string
  isMobileOnly?: boolean
}

export function AuthenticationCardThemeLogoComponent({
  logoLightSrc,
  logoLightAlt,
  logoDarkSrc,
  logoDarkAlt,
  className,
  isMobileOnly = false
}: AuthenticationCardThemeLogoComponentProps) {
  return (
    <picture>
      {['light', 'dark'].map((mode) => (
        <img
          key={mode}
          src={mode === 'light' ? logoLightSrc : logoDarkSrc}
          alt={mode === 'light' ? logoLightAlt : logoDarkAlt}
          className={cn(
            'aspect-auto',
            mode === 'light' ? 'dark:!hidden' : 'dark:!block grayscale !hidden',
            className,
            isMobileOnly ? 'block sm:hidden' : 'sm:block'
          )}
        />
      ))}
    </picture>
  )
}
