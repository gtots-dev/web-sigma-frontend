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
        alt="Imagem ilustrativa relacionada a seção de autenticação"
        height="100%"
        width="100%"
        fetchPriority="high"
      />
      {children}
    </picture>
  )
}
