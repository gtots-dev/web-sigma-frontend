'use client'

import { useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowUpDown } from 'lucide-react'
import {
  Button,
  type ButtonProps
} from '@/modules/shared/presentation/components/shadcn/button'

export function PostLaneModalTrigger({ onClick, ...props }: ButtonProps) {
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
      <ArrowUpDown />
      <span className="truncate">Adicionar Faixa</span>
    </Button>
  )
}
