'use client'

import type { ReactNode } from 'react'
import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/modules/shared/presentation/components/shadcn/tooltip'
import { useTableStatus } from '../../contexts/table-status.context'

interface TableStatusItemComponentProps {
  children?: ReactNode
}

const truncateText =
  'h-auto md:h-[52.5px] sm:max-w-full truncate whitespace-nowrap overflow-hidden'
const baseCell = 'ps-5 sm:ps-10 text-zinc-700 dark:text-zinc-50'

export function TableStatusItemComponent({
  children
}: TableStatusItemComponentProps) {
  const status = useTableStatus()

  // Amostra visual de status de acordo com o escopo (UP ou LANE)
  const isUp = status.origin === 'UP'
  const originLabel = isUp ? 'U.P.' : 'Faixa'
  const demoType = status.id % 3

  return (
    <TableRow>
      <TableCell className={`${baseCell} ${truncateText} w-[46%] max-w-0`}>
        <div className="flex flex-col gap-y-0.5 min-w-0 w-full">
          <span title={status.description} className="truncate font-medium block">
            {status.description}
          </span>
          <div className="flex items-center gap-2 mt-0.5 sm:hidden">
            <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
              {originLabel}
            </span>
            {/* <span className="text-zinc-300 dark:text-zinc-700">•</span>
            {demoType === 1 && (
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Ativo
              </span>
            )}
            {demoType === 2 && (
              <span className="text-[11px] font-medium text-zinc-800 dark:text-zinc-200">
                {isUp ? 'Ignorado (2 U.P.s)' : 'Ignorado (3 faixas)'}
              </span>
            )}
            {demoType === 0 && (
              <span className="text-[11px] font-medium text-zinc-800 dark:text-zinc-200">
                Ignorado (Todas)
              </span>
            )} */}
          </div>
        </div>
      </TableCell>

      <TableCell className={`${baseCell} ${truncateText} hidden sm:table-cell w-[20%]`}>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
          {originLabel}
        </span>
      </TableCell>

      {/* <TableCell className={`${baseCell} ${truncateText} hidden sm:table-cell w-[22%]`}>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="inline-flex items-center gap-x-2 py-1 px-3 border border-zinc-200 dark:border-zinc-800 rounded-full hover:bg-muted/50 transition-colors cursor-pointer select-none">
                {demoType === 1 && (
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Ativo
                  </span>
                )}
                {demoType === 2 && (
                  <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                    {isUp ? 'Ignorado (2 U.P.s)' : 'Ignorado (3 faixas)'}
                  </span>
                )}
                {demoType === 0 && (
                  <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                    Ignorado (Todas)
                  </span>
                )}
              </div>
            </TooltipTrigger>

            <TooltipContent
              side="top"
              sideOffset={6}
              className="z-50 min-w-[240px] max-w-xs p-3 bg-popover text-popover-foreground border border-border shadow-lg rounded-lg text-xs"
            >
              {demoType === 1 && (
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between pb-1.5 border-b border-border/60">
                    <span className="font-semibold text-foreground">
                      Monitoramento Ativo
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground">
                      Padrão
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {isUp
                      ? 'Status emitido e monitorado em todas as U.P.s deste contrato. Nenhuma regra de descarte aplicada.'
                      : 'Status emitido e monitorado em todas as faixas deste contrato. Nenhuma regra de descarte aplicada.'}
                  </p>
                </div>
              )}

              {demoType === 2 && (
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between pb-1.5 border-b border-border/60">
                    <span className="font-semibold text-foreground">
                      Regra de Exceção Ativa
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                      {isUp ? '2 U.P.s' : '3 faixas'}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {isUp
                      ? 'Status configurado para ser ignorado nas seguintes U.P.s:'
                      : 'Status configurado para ser ignorado nas seguintes faixas:'}
                  </p>
                  <ul className="space-y-1 pt-0.5">
                    {isUp ? (
                      <>
                        <li className="flex items-center gap-2 text-[11px] font-medium text-foreground">
                          <span className="h-1 w-1 rounded-full bg-zinc-400 dark:bg-zinc-500 shrink-0" />
                          U.P. 01 - Rodovia SP-070 Km 12
                        </li>
                        <li className="flex items-center gap-2 text-[11px] font-medium text-foreground">
                          <span className="h-1 w-1 rounded-full bg-zinc-400 dark:bg-zinc-500 shrink-0" />
                          U.P. 02 - Rodovia SP-070 Km 18
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-center gap-2 text-[11px] font-medium text-foreground">
                          <span className="h-1 w-1 rounded-full bg-zinc-400 dark:bg-zinc-500 shrink-0" />
                          Faixa 01 - Sentido Capital
                        </li>
                        <li className="flex items-center gap-2 text-[11px] font-medium text-foreground">
                          <span className="h-1 w-1 rounded-full bg-zinc-400 dark:bg-zinc-500 shrink-0" />
                          Faixa 02 - Sentido Interior
                        </li>
                        <li className="flex items-center gap-2 text-[11px] font-medium text-foreground">
                          <span className="h-1 w-1 rounded-full bg-zinc-400 dark:bg-zinc-500 shrink-0" />
                          Faixa 03 - Sentido Interior
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}

              {demoType === 0 && (
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between pb-1.5 border-b border-border/60">
                    <span className="font-semibold text-foreground">
                      Descarte Global
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                      Todas
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {isUp
                      ? 'Status configurado para ser ignorado em todas as U.P.s cadastradas neste contrato.'
                      : 'Status configurado para ser ignorado em todas as faixas cadastradas neste contrato.'}
                  </p>
                </div>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell> */}

      <TableCell className="pe-5 sm:pe-10 text-right w-[12%]" colSpan={1}>
        {children}
      </TableCell>
    </TableRow>
  )
}
