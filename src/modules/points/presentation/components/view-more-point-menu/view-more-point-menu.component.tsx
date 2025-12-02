'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ViewMorePointMenu } from '.'
import { useTablePoint } from '../../contexts/table-point.context'
import { useViewMorePointMenuContext } from '../../contexts/view-more-point-menu.context'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'
import { useMemo } from 'react'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'

interface ViewMorePointMenuComponentProps {
  title: string
  description: string
}

export function ViewMorePointMenuComponent({
  title,
  description
}: ViewMorePointMenuComponentProps) {
  const { contractLanes } = useLaneStore()
  const { isOpen, close } = useViewMorePointMenuContext()
  const { point } = useTablePoint()

  const isLanesSelected = useMemo<LaneEntity[]>(
    () =>
      contractLanes
        .filter((contractLane) => contractLane.point_id == point.id)
        .map((contractLane) => contractLane.lane),
    [contractLanes, point.id]
  )

  return (
    <ViewMorePointMenu.Root isOpen={isOpen} close={close}>
      <ViewMorePointMenu.Content>
        <ViewMorePointMenu.Header title={title} description={description} />

        <main className="flex flex-col flex-1 h-full w-full gap-y-8 overflow-auto p-8">
          <ViewMorePointMenu.Group>
            <ViewMorePointMenu.Item title="Nome" notFoundData="Sem Informação">
              {point.name}
            </ViewMorePointMenu.Item>
            <ViewMorePointMenu.Item
              title="Habilitado"
              notFoundData="Sem Informação"
            >
              {point.enabled ? 'Sim' : 'Não'}
            </ViewMorePointMenu.Item>
          </ViewMorePointMenu.Group>
          <ViewMorePointMenu.Group cols={1}>
            <ViewMorePointMenu.Item
              title="Descrição"
              notFoundData="Sem Informação"
            >
              {point.description}
            </ViewMorePointMenu.Item>
          </ViewMorePointMenu.Group>
          <ViewMorePointMenu.Group cols={1}>
            <ViewMorePointMenu.Item
              title="Configuração"
              notFoundData="Sem Informação"
            >
              {JSON.stringify(point.cfg, null, 2)}
            </ViewMorePointMenu.Item>
          </ViewMorePointMenu.Group>
          <ViewMorePointMenu.Group cols={1}>
            <ViewMorePointMenu.Item
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
            </ViewMorePointMenu.Item>
          </ViewMorePointMenu.Group>
        </main>

        <ViewMorePointMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Fechar
          </Button>
        </ViewMorePointMenu.Footer>
      </ViewMorePointMenu.Content>
    </ViewMorePointMenu.Root>
  )
}
