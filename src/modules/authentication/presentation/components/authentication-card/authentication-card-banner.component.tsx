import Image, { type StaticImageData } from 'next/image'
import type { ReactNode } from 'react'

type ImageSrc = string | StaticImageData

interface AuthenticationCardBannerComponentProps {
  src: ImageSrc
  alt: string
  children: ReactNode
}

export function AuthenticationCardBannerComponent({
  children,
  src,
  alt
}: AuthenticationCardBannerComponentProps) {
  return (
    <div className="relative hidden xl:block h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover dark:brightness-[0.9] dark:grayscale"
        priority
      />
      {children}
    </div>
  )
}
