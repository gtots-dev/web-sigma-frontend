import {
  Card,
  CardContent
} from '@/modules/shared/presentation/components/shadcn/card'
import type { ReactNode } from 'react'

interface PasswordResetCardRootComponentProps {
  children: ReactNode
  copyright: string
}

export function PasswordResetCardRootComponent({
  children,
  copyright
}: PasswordResetCardRootComponentProps) {
  return (
    <div className="flex sm:h-full min-h-svh flex-col items-center justify-center sm:justify-start bg-white sm:bg-muted dark:bg-zinc-950 sm:dark:bg-zinc-900 p-0 md:p-10">
      <div className="w-full h-full max-w-sm sm:max-w-[446px] sm:mt-20">
        <div className="flex flex-col gap-6 h-auto py-4 sm:p-0">
          <Card className="overflow-hidden border-0 rounded-none sm:rounded-2xl bg-transparent shadow-none my-auto">
            <CardContent className="grid p-0 min-h-auto xl:min-h-[55svh] bg-transparent sm:bg-white dark:bg-zinc-950">
              {children}
            </CardContent>
          </Card>
          <div className="text-balance text-center text-sm mt-auto sm:mt-3 text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            {copyright}
          </div>
        </div>
      </div>
    </div>
  )
}
