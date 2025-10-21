import type { ReactNode } from 'react'

interface FrameOptionsContentComponentProps {
  children: ReactNode
}

export function FrameOptionsContentComponent({
  children
}: FrameOptionsContentComponentProps) {
  return (
    <div className="flex w-full justify-start flex-wrap gap-7 sm:gap-14">
      {children}
    </div>
  )
}
