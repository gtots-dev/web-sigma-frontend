'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { useGroupById } from '../../hooks/use-group-by-id.hook'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'
import { usePointStore } from '@/modules/points/presentation/stores/point.store'
import { MESSAGES_POINT } from '@/modules/shared/presentation/messages/points'
import { MESSAGES_LANE } from '@/modules/shared/presentation/messages/lanes'
import { MESSAGES_GROUP } from '@/modules/shared/presentation/messages/groups'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'
import type { PointEntity } from '@/modules/points/domain/entities/point.entity'
import type { GroupEntity } from '@/modules/groups/domain/entities/group.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export interface ViewMoreGroupModalProps {
  title: string
  description: string
  groupId: number
  isPermittedLane?: boolean
  isPermittedPoints?: boolean
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

export function ViewMoreGroupModal({
  title,
  description,
  groupId,
  isPermittedLane = true,
  isPermittedPoints = true,
  onClose,
  onReturn
}: ViewMoreGroupModalProps) {
  const { operationId, contractId }: UrlParams = useParams()
  const { handleClose, handleReturn } = useModalNavigation({
    onClose,
    onReturn
  })
  const { group, groups, loading: loadingGroup } = useGroupById(groupId)
  const { contractLanes, getContractLanes } = useLaneStore()
  const { points, getPoints } = usePointStore()
  const [loadingRelations, setLoadingRelations] = useState(
    isPermittedLane || isPermittedPoints
  )

  useEffect(() => {
    if (!isPermittedLane && !isPermittedPoints) return

    let active = true
    Promise.all([
      isPermittedLane
        ? getContractLanes({ operationId, contractId }).catch(() => undefined)
        : Promise.resolve(),
      isPermittedPoints
        ? getPoints({ operationId, contractId }).catch(() => undefined)
        : Promise.resolve()
    ]).finally(() => {
      if (active) setLoadingRelations(false)
    })

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loading = loadingGroup || loadingRelations

  const isLanesSelected = useMemo<LaneEntity[]>(
    () =>
      contractLanes
        .filter((contractLane) => contractLane.group_id.includes(groupId))
        .map((contractLane) => contractLane.lane),
    [contractLanes, groupId]
  )

  const isPointsSelected = useMemo<PointEntity[]>(
    () =>
      points
        .filter((point) => point.group_id.includes(groupId))
        .map((point) => point.point),
    [points, groupId]
  )

  const isGroupsSelected = useMemo<GroupEntity[]>(() => {
    const relatedGroupIds = groups.find((g) => g.group.id === groupId)?.group_id

    return relatedGroupIds
      ? groups
          .filter((g) => relatedGroupIds.includes(g.group.id))
          .map((g) => g.group)
      : []
  }, [groups, groupId])

  if (!loading && !group) {
    return (
      <ModalShell.Empty
        title="Grupo não encontrado"
        description={`O grupo solicitado com o ID ${groupId} não existe ou foi removido.`}
        onReturn={handleReturn}
      />
    )
  }

  return (
    <ModalShell.Root>
      <ModalShell.Loading when={loading} />

      {!loading && group && (
        <>
          <ModalShell.Header title={title} description={description} />
          <ModalShell.Content>
            <main className="flex flex-col flex-1 h-full w-full gap-y-8 overflow-auto p-8">
              <ViewMoreGroup>
                <ViewMoreItem title="Nome" notFoundData="Sem Informação">
                  {group.name}
                </ViewMoreItem>
                <ViewMoreItem title="Habilitado" notFoundData="Sem Informação">
                  {group.enabled ? 'Sim' : 'Não'}
                </ViewMoreItem>
              </ViewMoreGroup>

              <ViewMoreGroup cols={1}>
                <ViewMoreItem title="Descrição" notFoundData="Sem Informação">
                  {group.description}
                </ViewMoreItem>
              </ViewMoreGroup>

              <ViewMoreGroup cols={1}>
                <ViewMoreItem
                  title="Configuração"
                  notFoundData="Sem Informação"
                >
                  {JSON.stringify(group.cfg, null, 2)}
                </ViewMoreItem>
              </ViewMoreGroup>

              <ViewMoreGroup cols={1}>
                <ViewMoreItem
                  title="Faixas Selecionadas"
                  notFoundData={MESSAGES_LANE['8.3']}
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

              <ViewMoreGroup cols={1}>
                <ViewMoreItem
                  title="Pontos Selecionados"
                  notFoundData={MESSAGES_POINT['14.3']}
                >
                  {isPointsSelected.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {isPointsSelected.map((point: PointEntity) => (
                        <div
                          key={point.id}
                          className="flex items-center justify-between w-fit gap-4 rounded-md border border-input py-2 px-4"
                        >
                          <div className="flex flex-col gap-0.5 overflow-hidden">
                            <h4 className="text-xs truncate font-medium">
                              {point.name}
                            </h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </ViewMoreItem>
              </ViewMoreGroup>

              <ViewMoreGroup cols={1}>
                <ViewMoreItem
                  title="Outros Grupos Selecionados"
                  notFoundData={MESSAGES_GROUP['18.3']}
                >
                  {isGroupsSelected.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {isGroupsSelected.map((item: GroupEntity) => (
                        <div
                          key={JSON.stringify(item)}
                          className="flex items-center justify-between w-fit gap-4 rounded-md border border-input py-2 px-4"
                        >
                          <div className="flex flex-col gap-0.5 overflow-hidden">
                            <h4 className="text-xs truncate font-medium">
                              {item.name}
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
