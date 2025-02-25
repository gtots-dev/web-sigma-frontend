import type { ComponentProps, ReactNode } from 'react'

interface AuthenticationCardBannerComponentProps extends ComponentProps<'img'> {
  children: ReactNode
}

export function AuthenticationCardBannerComponent({
  children,
  ...props
}: AuthenticationCardBannerComponentProps) {
  return (
    <picture className="relative hidden xl:block h-full w-full">
      <img
        {...props}
        className="absolute inset-0 h-full w-full dark:brightness-[0.9] dark:grayscale"
      />
      {children}
    </picture>
  )
}
