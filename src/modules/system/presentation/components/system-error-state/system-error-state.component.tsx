'use client'

import { useState } from 'react'
import { RefreshCw, ServerCrash, ShieldAlert } from 'lucide-react'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  Card,
  CardContent
} from '@/modules/shared/presentation/components/shadcn/card'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { ThemeToggle } from '@/modules/shared/presentation/components/theme-toggle/theme-toggle.component'
import { MESSAGES_AUTHENTICATION } from '@/modules/shared/presentation/messages/authentication'
import { useAuthenticationFormSubmitHook } from '@/modules/authentication/presentation/hooks/use-authentication-form-submit.hook'

interface SystemErrorStateProps {
  variant: 'server-error' | 'forbidden'
  message?: string
}

export function SystemErrorState({ variant, message }: SystemErrorStateProps) {
  const [reloading, setReloading] = useState(false)
  const { onSubmitSignOut, loading: signingOut } =
    useAuthenticationFormSubmitHook()

  const isServerError = variant === 'server-error'

  const badgeLabel = isServerError ? 'Servidor Indisponível' : 'Acesso Restrito'

  const title = isServerError ? 'Falha na conexão' : 'Acesso negado'

  const description =
    message ||
    (isServerError
      ? 'Não foi possível conectar ao servidor. O sistema pode estar temporariamente indisponível.'
      : 'Sua conta está autenticada, mas você não possui permissão para visualizar este recurso.')

  const handleRetry = () => {
    setReloading(true)
    window.location.reload()
  }

  return (
    <div className="relative flex sm:h-full min-h-svh flex-col items-center justify-center sm:justify-start bg-white sm:bg-muted dark:bg-zinc-950 sm:dark:bg-zinc-900 p-0 md:p-10">
      <div className="w-full h-full max-w-sm sm:max-w-[446px] sm:mt-20">
        <div className="flex flex-col gap-6 h-auto py-4 sm:p-0">
          <Card className="overflow-hidden border-0 rounded-none sm:rounded-2xl bg-transparent shadow-none my-auto">
            <CardContent className="grid p-0 min-h-auto xl:min-h-[55svh] bg-transparent sm:bg-white dark:bg-zinc-950">
              <div className="flex flex-col justify-between p-[35px] gap-6">
                <header className="flex flex-col gap-y-6">
                  <div className="flex flex-col gap-y-3 items-start text-start">
                    <h1 className="text-start text-[32px] sm:text-[36px] leading-tight font-medium dark:text-zinc-50">
                      {title}
                    </h1>
                    <p className="text-start text-black/50 dark:text-zinc-50/60 text-sm">
                      {description}
                    </p>
                  </div>
                  <div className="w-full">
                    <Separator className="dark:bg-zinc-800" />
                  </div>
                </header>

                <div className="flex flex-col items-center justify-center py-6 gap-3">
                  <div className="relative flex items-center justify-center w-20 h-20">
                    <div className="absolute inset-0 rounded-full border border-destructive/10 dark:border-red-400/10 animate-ping [animation-duration:2s]" />
                    <div className="absolute w-14 h-14 rounded-full border border-destructive/20 dark:border-red-400/20 animate-pulse duration-1000" />
                    <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-background border border-destructive/20 dark:border-red-400/20  shadow-md">
                      {isServerError ? (
                        <ServerCrash className="h-5 w-5 text-destructive dark:text-red-500" />
                      ) : (
                        <ShieldAlert className="h-5 w-5 text-destructive dark:text-red-500" />
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-widest text-destructive dark:text-red-500/85">
                    {badgeLabel}
                  </span>
                </div>

                <footer className="flex flex-col gap-3 w-full mt-2">
                  <Button
                    type="button"
                    variant="primary"
                    onClick={handleRetry}
                    disabled={reloading || signingOut}
                    className="w-full gap-2"
                  >
                    <RefreshCw
                      className={`h-4 w-4 ${reloading ? 'animate-spin' : ''}`}
                    />
                    Tentar novamente
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-sm text-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-50 border-1 hover:bg-transparent hover:border"
                    disabled={reloading || signingOut}
                    onClick={onSubmitSignOut}
                  >
                    Voltar para login
                  </Button>
                </footer>
              </div>
            </CardContent>
          </Card>

          <div className="text-balance text-center text-sm mt-auto sm:mt-3 text-muted-foreground">
            {MESSAGES_AUTHENTICATION['1.6']}
          </div>
        </div>
      </div>

      <ThemeToggle className="fixed top-10 right-10" title="Altere seu tema" />
    </div>
  )
}
