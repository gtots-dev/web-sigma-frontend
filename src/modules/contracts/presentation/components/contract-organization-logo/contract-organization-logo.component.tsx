'use client'

import { useState } from 'react'
import { FileText } from 'lucide-react'
import { Skeleton } from '@/modules/shared/presentation/components/shadcn/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/modules/shared/presentation/components/shadcn/tooltip'
import { cn } from '@/modules/shared/presentation/lib/utils'

export interface ContractOrganizationLogoComponentProps {
  url?: string | null
  alt?: string
  contractName?: string
  contractAlias?: string
  className?: string
}

export function ContractOrganizationLogoComponent({
  url,
  alt = 'Logotipo da organização responsável pelo contrato',
  contractName,
  contractAlias,
  className
}: ContractOrganizationLogoComponentProps) {
  const [prevUrl, setPrevUrl] = useState(url)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  if (url !== prevUrl) {
    setPrevUrl(url)
    setIsLoaded(false)
    setHasError(false)
  }

  if (!url) {
    return null
  }

  if (hasError) {
    return (
      <div
        title={alt}
        className={cn(
          'grid place-content-center h-10 w-10 shrink-0 rounded-lg bg-primary-600 shadow-xs transition-all',
          className
        )}
      >
        <FileText className="h-4 w-4 text-white" />
      </div>
    )
  }

  return (
    <TooltipProvider delayDuration={180}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'relative flex items-center justify-center h-11 w-auto min-w-11 max-w-[140px] sm:max-w-[200px] shrink-0 overflow-hidden rounded-lg transition-all duration-200',
              isLoaded &&
                'px-2.5 py-1 bg-white dark:bg-zinc-100/95 border border-zinc-200/80 dark:border-zinc-700/80 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-500 cursor-pointer',
              className
            )}
          >
            {!isLoaded && <Skeleton className="h-10 w-24 rounded-lg" />}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={url}
              src={url}
              alt={alt}
              onLoad={() => setIsLoaded(true)}
              onError={() => {
                setHasError(true)
                setIsLoaded(false)
              }}
              className={cn(
                'h-full w-auto max-w-[125px] sm:max-w-[180px] object-contain transition-opacity duration-200',
                isLoaded
                  ? 'opacity-100'
                  : 'opacity-0 absolute inset-0 pointer-events-none'
              )}
            />
          </div>
        </TooltipTrigger>

        {isLoaded && (
          <TooltipContent
            side="bottom"
            align="end"
            sideOffset={8}
            className="z-[100] bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 border border-border/80 shadow-lg p-3 rounded-xl max-w-[290px]"
          >
            <div className="flex flex-col gap-y-2.5">
              <div className="flex items-center justify-center bg-zinc-50/80 dark:bg-white rounded-lg border border-zinc-200/60 dark:border-zinc-700/60 px-4 py-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={alt}
                  className="max-h-16 w-auto max-w-[230px] object-contain"
                />
              </div>

              {(contractName || contractAlias) && (
                <div className="flex flex-col px-0.5">
                  {contractName && (
                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 leading-snug">
                      {contractName}
                    </span>
                  )}
                  {contractAlias && (
                    <span className="text-[11px] text-muted-foreground leading-tight">
                      {contractAlias}
                    </span>
                  )}
                </div>
              )}
            </div>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}
