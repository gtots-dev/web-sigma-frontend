'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { usePointById } from '../../hooks/use-point-by-id.hook'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export interface ViewMorePointModalProps {
  title: string
  description: string
  pointId: number
  isPermittedLane?: boolean
  onClose?: () => void
  onReturn?: () => void
}

function ViewMoreGroup({
  children,
  cols = 2
}: {
  children: ReactNode
  cols?: number
}) {
  const colClass = cols === 1 ? 'grid-cols-1' : 'grid-cols-2'
  return <div className={`grid ${colClass} gap-7`}>{children}</div>
}

function ViewMoreItem({
  children,
  title,
  notFoundData
}: {
  children: ReactNode
  title: string
  notFoundData: string
}) {
  const hasContent =
    children !== undefined &&
    children !== null &&
    !(typeof children === 'string' && children.trim() === '')

  return (
    <div className="flex flex-col gap-y-1.5 min-h-12">
      <strong className="text-sm font-medium opacity-80">{title}:</strong>
      {hasContent ? (
        <div className="font-normal">{children}</div>
      ) : (
        <div className="font-normal opacity-70">{notFoundData}</div>
      )}
    </div>
  )
}

export function ViewMorePointModal({
  title,
  description,
  pointId,
  isPermittedLane = true,
  onClose,
  onReturn
}: ViewMorePointModalProps) {
  const { operationId, contractId }: UrlParams = useParams()
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { point, loading: loadingPoint } = usePointById(pointId)
  const { contractLanes, getContractLanes } = useLaneStore()
  const [loadingLanes, setLoadingLanes] = useState(isPermittedLane)

  useEffect(() => {
    if (!isPermittedLane) return

    let active = true
    getContractLanes({ operationId, contractId })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoadingLanes(false)
      })

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loading = loadingPoint || loadingLanes

  const isLanesSelected = useMemo<LaneEntity[]>(
    () =>
      contractLanes
        .filter((contractLane) => contractLane.point_id === pointId)
        .map((contractLane) => contractLane.lane),
    [contractLanes, pointId]
  )

  if (!loading && !point) {
    return (
      <ModalShell.Empty
        title="Ponto não encontrado"
        description={`O ponto solicitado com o ID ${pointId} não existe ou foi removido.`}
        onReturn={handleReturn}
      />
    )
  }

  return (
    <ModalShell.Root>
      <ModalShell.Loading when={loading} />

      {!loading && point && (
        <>
          <ModalShell.Header title={title} description={description} />
          <ModalShell.Content>
            <main className="flex flex-col flex-1 h-full w-full gap-y-8 overflow-auto p-8">
              <ViewMoreGroup>
                <ViewMoreItem title="Nome" notFoundData="Sem Informação">
                  {point.name}
                </ViewMoreItem>
                <ViewMoreItem title="Habilitado" notFoundData="Sem Informação">
                  {point.enabled ? 'Sim' : 'Não'}
                </ViewMoreItem>
              </ViewMoreGroup>

              <ViewMoreGroup>
                <ViewMoreItem title="Latitude" notFoundData="Sem Informação">
                  {point.latitude}
                </ViewMoreItem>
                <ViewMoreItem title="Longitude" notFoundData="Sem Informação">
                  {point.longitude}
                </ViewMoreItem>
              </ViewMoreGroup>

              <ViewMoreGroup cols={1}>
                <ViewMoreItem title="Descrição" notFoundData="Sem Informação">
                  {point.description}
                </ViewMoreItem>
              </ViewMoreGroup>

              <ViewMoreGroup cols={1}>
                <ViewMoreItem
                  title="Configuração"
                  notFoundData="Sem Informação"
                >
                  {JSON.stringify(point.cfg, null, 2)}
                </ViewMoreItem>
              </ViewMoreGroup>

              <ViewMoreGroup cols={1}>
                <ViewMoreItem
                  title="Faixas Selecionadas"
                  notFoundData="Nenhuma faixa selecionada"
                >
                  {isLanesSelected.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {isLanesSelected.map((lane: LaneEntity) => (
                        <div
                          key={lane.id}
                          className="flex items-center justify-between w-fit gap-4 rounded-md border border-input py-2 px-4"
                        >
                          <div className="flex flex-col gap-0.5 overflow-hidden">
                            <h4 className="text-xs truncate font-medium">
                              {lane.name}
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
