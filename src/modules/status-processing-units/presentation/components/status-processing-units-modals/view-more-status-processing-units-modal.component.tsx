'use client'

import { useMemo, type ReactNode } from 'react'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { MESSAGES_STATUS_PROCESSING_UNITS } from '@/modules/shared/presentation/messages/status-processing-units'
import { useStatusProcessingUnitById } from '../../hooks/use-status-processing-unit-by-id.hook'
import { useProcessingUnitsOptions } from '../../hooks/use-processing-units-options.hook'
import { useStatusProcessingUnitIgnores } from '../../hooks/use-status-processing-unit-ignores.hook'

export interface ViewMoreStatusProcessingUnitsModalProps {
  title: string
  description: string
  statusId: number
  hasPermission?: boolean
  onClose?: () => void
  onReturn?: () => void
}

function ViewMoreGroup({
  children,
  cols = 2
}: {
  children: ReactNode
  cols?: 1 | 2
}) {
  const colClass = cols === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
  return <div className={`grid ${colClass} gap-7`}>{children}</div>
}

function ViewMoreItem({
  title,
  notFoundData,
  children
}: {
  title: string
  notFoundData: string
  children?: ReactNode
}) {
  const hasContent =
    children !== undefined &&
    children !== null &&
    !(typeof children === 'string' && children.trim() === '')

  return (
    <div className="flex flex-col gap-y-1.5 min-h-12">
      <strong className="text-sm font-medium opacity-80">{title}:</strong>
      {hasContent ? (
        <div className="font-normal text-sm">{children}</div>
      ) : (
        <div className="font-normal text-sm opacity-70">{notFoundData}</div>
      )}
    </div>
  )
}

export function ViewMoreStatusProcessingUnitsModal({
  title,
  description,
  statusId,
  hasPermission = true,
  onClose,
  onReturn
}: ViewMoreStatusProcessingUnitsModalProps) {
  const { handleClose, handleReturn } = useModalNavigation({ onClose, onReturn })
  const { status, loading: loadingStatus } = useStatusProcessingUnitById(statusId)
  const { processingUnits, loading: loadingUnits } = useProcessingUnitsOptions()
  const { initialProcessingUnitIds, loading: loadingIgnores } =
    useStatusProcessingUnitIgnores(statusId, processingUnits)

  const loading = loadingStatus || loadingUnits || loadingIgnores

  const ignoredUnits = useMemo(
    () =>
      processingUnits.filter(
        (unit) =>
          typeof unit.id === 'number' &&
          initialProcessingUnitIds.includes(unit.id)
      ),
    [processingUnits, initialProcessingUnitIds]
  )

  const monitoringSummary = useMemo(() => {
    if (ignoredUnits.length === 0) {
      return 'Ativo em todas as U.P.s'
    }
    if (
      processingUnits.length > 0 &&
      ignoredUnits.length === processingUnits.length
    ) {
      return 'Ignorado em todas as U.P.s'
    }
    return `Ignorado em ${ignoredUnits.length} de ${processingUnits.length} U.P.(s)`
  }, [ignoredUnits.length, processingUnits.length])

  if (!loading && !status) {
    return (
      <ModalShell.Empty
        title={MESSAGES_STATUS_PROCESSING_UNITS['25.9']}
        description={`O status solicitado com o ID ${statusId} não existe ou foi removido.`}
        onReturn={handleReturn}
      />
    )
  }

  return (
    <ModalShell.Root>
      <ModalShell.Loading when={loading} />

      {!loading && status && (
        <>
          <ModalShell.Header title={title} description={description} />
          <ModalShell.Content>
            <main className="flex flex-col flex-1 h-full w-full gap-y-8 overflow-auto p-5 sm:p-10">
              <ViewMoreGroup cols={1}>
                <ViewMoreItem title="Descrição" notFoundData="Sem Informação">
                  {status.description}
                </ViewMoreItem>
              </ViewMoreGroup>

              <ViewMoreGroup>
                <ViewMoreItem title="Código" notFoundData="Sem Informação">
                  <span className="font-mono text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">
                    {status.code}
                  </span>
                </ViewMoreItem>
                <ViewMoreItem title="Origem" notFoundData="Sem Informação">
                  U.P. (Unidade de Processamento)
                </ViewMoreItem>
              </ViewMoreGroup>

              <ViewMoreGroup cols={1}>
                <ViewMoreItem
                  title="Status de Monitoramento"
                  notFoundData="Sem Informação"
                >
                  {monitoringSummary}
                </ViewMoreItem>
              </ViewMoreGroup>

              <ViewMoreGroup cols={1}>
                <ViewMoreItem
                  title="U.P.s com este Status Ignorado"
                  notFoundData={
                    hasPermission
                      ? 'Nenhuma U.P. configurada para ignorar este status'
                      : MESSAGES_STATUS_PROCESSING_UNITS['25.7']
                  }
                >
                  {hasPermission && ignoredUnits.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {ignoredUnits.map((unit) => (
                        <div
                          key={unit.id}
                          className="flex items-center justify-between w-fit gap-4 rounded-md border border-input py-2 px-4"
                        >
                          <div className="flex flex-col gap-0.5 overflow-hidden">
                            <h4 className="text-xs truncate font-medium">
                              {unit.name}
                            </h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </ViewMoreItem>
              </ViewMoreGroup>
            </main>
          </ModalShell.Content>
          <ModalShell.Footer>
            <Button
              className="w-full sm:w-[150px]"
              variant="outline"
              type="button"
              onClick={handleClose}
            >
              Fechar
            </Button>
          </ModalShell.Footer>
        </>
      )}
    </ModalShell.Root>
  )
}
