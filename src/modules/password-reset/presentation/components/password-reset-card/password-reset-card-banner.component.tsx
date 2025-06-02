import type { ComponentProps, ReactNode } from 'react'

interface PasswordResetCardBannerComponentProps extends ComponentProps<'img'> {
  children: ReactNode
}

export function PasswordResetCardBannerComponent({
  children,
  ...props
}: PasswordResetCardBannerComponentProps) {
  return (
    <picture className="relative hidden xl:block h-full w-full">
      <img
        {...props}
        className="absolute inset-0 h-full w-full dark:brightness-[0.9] dark:grayscale"
        height="100%"
        width="100%"
        fetchPriority="high"
      />
      {children}
    </picture>
  )
}
