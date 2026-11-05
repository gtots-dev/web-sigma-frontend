'use client'

import { useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { HardDrive } from 'lucide-react'
import {
  Button,
  type ButtonProps
} from '@/modules/shared/presentation/components/shadcn/button'

export function PostProcessingUnitModalTrigger({
  onClick,
  ...props
}: ButtonProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleOpen = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      router.push(`${pathname}/modal/post`, { scroll: false })
    },
    [onClick, pathname, router]
  )

  return (
    <Button
      variant="primary"
      className="w-full sm:w-auto"
      {...props}
      onClick={handleOpen}
    >
      <HardDrive />
      <span className="truncate">Adicionar Unidade de Processamento</span>
    </Button>
  )
}
