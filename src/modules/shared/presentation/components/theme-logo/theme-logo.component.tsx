import { cn } from '@/modules/shared/presentation/lib/utils'
import type { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

interface ThemeLogoComponentProps {
  logoLightSrc: string | StaticImport
  logoLightAlt: string
  logoDarkSrc: string | StaticImport
  logoDarkAlt: string
  className?: string
  width: number
  height: number
  isMobileOnly?: boolean
}

export function ThemeLogoComponent({
  logoLightSrc,
  logoLightAlt,
  logoDarkSrc,
  logoDarkAlt,
  className,
  width,
  height,
  isMobileOnly = false
}: ThemeLogoComponentProps) {
  return (
    <>
      {['light', 'dark'].map((mode) => (
        <Image
          key={mode}
          src={mode === 'light' ? logoLightSrc : logoDarkSrc}
          alt={mode === 'light' ? logoLightAlt : logoDarkAlt}
          width={width}
          height={height}
          className={cn(
            mode === 'light' ? 'dark:!hidden' : 'dark:!block grayscale !hidden',
            className,
            isMobileOnly ? 'block sm:hidden' : 'sm:block'
          )}
          fetchPriority="high"
        />
      ))}
    </>
  )
}
