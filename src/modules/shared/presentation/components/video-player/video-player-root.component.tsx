import React, { ReactNode } from 'react'
import { Card } from '@/modules/shared/presentation/components/shadcn/card'

interface VideoPlayerRootProps {
  children: ReactNode
}

export function VideoPlayerRootComponent({ children }: VideoPlayerRootProps) {
  return <Card className="overflow-hidden p-0 relative border flex flex-col flex-1 min-h-0 min-w-0 w-full">{children}</Card>
}
