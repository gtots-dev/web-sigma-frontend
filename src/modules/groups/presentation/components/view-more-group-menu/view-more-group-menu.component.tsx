'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ViewMoreGroupMenu } from '.'
import { useTableGroup } from '../../contexts/table-group.context'
import { useViewMoreGroupMenuContext } from '../../contexts/view-more-group-menu.context'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'
import { useMemo } from 'react'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'

interface ViewMoreGroupMenuComponentProps {
  title: string
  description: string
}

export function ViewMoreGroupMenuComponent({
  title,
  description
}: ViewMoreGroupMenuComponentProps) {
  const { contractLanes } = useLaneStore()
  const { isOpen, close } = useViewMoreGroupMenuContext()
  const { group } = useTableGroup()

  const isLanesSelected = useMemo<LaneEntity[]>(
    () =>
      contractLanes
        .filter((contractLane) => contractLane.group_id.includes(group.id))
        .map((contractLane) => contractLane.lane),
    [contractLanes, group.id]
  )

  return (
    <ViewMoreGroupMenu.Root isOpen={isOpen} close={close}>
      <ViewMoreGroupMenu.Content>
        <ViewMoreGroupMenu.Header title={title} description={description} />

        <main className="flex flex-col flex-1 h-full w-full gap-y-8 overflow-auto p-8">
          <ViewMoreGroupMenu.Group>
            <ViewMoreGroupMenu.Item title="Nome" notFoundData="Sem Informação">
              {group.name}
            </ViewMoreGroupMenu.Item>
            <ViewMoreGroupMenu.Item
              title="Habilitado"
              notFoundData="Sem Informação"
            >
              {group.enabled ? 'Sim' : 'Não'}
            </ViewMoreGroupMenu.Item>
          </ViewMoreGroupMenu.Group>
          <ViewMoreGroupMenu.Group cols={1}>
            <ViewMoreGroupMenu.Item
              title="Descrição"
              notFoundData="Sem Informação"
            >
              {group.description}
            </ViewMoreGroupMenu.Item>
          </ViewMoreGroupMenu.Group>
          <ViewMoreGroupMenu.Group cols={1}>
            <ViewMoreGroupMenu.Item
              title="Configuração"
              notFoundData="Sem Informação"
            >
              {JSON.stringify(group.cfg, null, 2)}
            </ViewMoreGroupMenu.Item>
          </ViewMoreGroupMenu.Group>
          <ViewMoreGroupMenu.Group cols={1}>
            <ViewMoreGroupMenu.Item
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
            </ViewMoreGroupMenu.Item>
          </ViewMoreGroupMenu.Group>
        </main>

        <ViewMoreGroupMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Fechar
          </Button>
        </ViewMoreGroupMenu.Footer>
      </ViewMoreGroupMenu.Content>
    </ViewMoreGroupMenu.Root>
  )
}
