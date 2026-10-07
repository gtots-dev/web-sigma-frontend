'use client'

import { useRouter, useParams } from 'next/navigation'
import { useEffect, useRef, useCallback, type ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { toast } from '@/modules/shared/presentation/components/hooks/use-toast'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { ModalShellContent } from './modal-shell-content.component'
import { ModalShellFooter } from './modal-shell-footer.component'
import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

export interface ModalShellEmptyProps {
  when?: boolean
  title?: string
  description?: string
  buttonText?: string
  asToast?: boolean
  onReturn?: () => void
  children?: ReactNode
}

export function ModalShellEmpty({
  when = true,
  title = 'Registro não encontrado',
  description = 'O registro solicitado não existe ou foi removido.',
  buttonText = 'Voltar',
  asToast = true,
  onReturn,
  children
}: ModalShellEmptyProps) {
  const router = useRouter()
  const params = useParams() as UrlParams | null
  const hasFiredRef = useRef(false)

  const handleReturn = useCallback(() => {
    if (onReturn) {
      onReturn()
      return
    }
    const lastRoute =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('last_visited_route')
        : null
    const fallbackPath = params?.operationId
      ? PATHNAMES.CONTRACTS(Number(params.operationId))
      : '/'
    router.replace(lastRoute ?? fallbackPath)
  }, [onReturn, router, params?.operationId])

  useEffect(() => {
    if (when && asToast && !hasFiredRef.current) {
      hasFiredRef.current = true
      toast({
        variant: 'destructive',
        title,
        description
      })
      handleReturn()
    }
  }, [when, asToast, title, description, handleReturn])

  if (!when) return null

  if (asToast) return null

  if (children) return <>{children}</>

  return (
    <>
      <DrawerDialog.Title>{title}</DrawerDialog.Title>
      <DrawerDialog.Description>{description}</DrawerDialog.Description>
      <ModalShellContent>
        <div className="flex h-full flex-col items-center justify-center p-8 text-center gap-3">
          <AlertCircle className="h-10 w-10 text-amber-500" />
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </ModalShellContent>
      <ModalShellFooter>
        <Button
          className="w-full sm:w-[150px]"
          variant="outline"
          type="button"
          onClick={handleReturn}
        >
          {buttonText}
        </Button>
      </ModalShellFooter>
    </>
  )
}
