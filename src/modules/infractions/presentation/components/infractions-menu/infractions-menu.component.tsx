'use client'

import { InfractionsMenu } from '.'
import { InfractionDescription } from '../infraction-description'
import { InfractionViewer } from '../infraction-viewer'
import { InfractionsPanel } from '../infractions-panel'
import { InfractionsSidebar } from '../infractions-sidebar'
import { InfractionsTimeline } from '../infractions-timeline'
import { useInfractionsSelection } from '../../hooks/use-infractions-selection.hook'
import { useInfractionsMenuContext } from '../../contexts/infractions-menu.context'

export function InfractionsMenuComponent() {
  const { isOpen, close, infractions, selectedInfraction } =
    useInfractionsMenuContext()

  const { activeId, handleSelect, activeInfraction, sortedInfractions } =
    useInfractionsSelection(infractions)

  if (!selectedInfraction) return null
  if (!activeInfraction) return null
  if (infractions.length === 0) return <InfractionsPanel.Empty />

  const activeMeta = activeInfraction.response?.metadata?.[0] ?? null
  const laneId = activeInfraction.lane_id
  const location = activeMeta ? `${activeMeta.city} — ${activeMeta.state}` : ''
  const activeImageUrl = activeInfraction.response.file.url

  return (
    <InfractionsMenu.Root isOpen={isOpen} close={close}>
      <InfractionsMenu.Content className="md:max-w-[1200px] lg:max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] w-[98vw] !h-[95vh] p-3">
        <InfractionsPanel.Root>
          <InfractionsSidebar.Root>
            <InfractionsSidebar.Header count={sortedInfractions.length} />
            <InfractionsSidebar.List>
              {sortedInfractions.map((infraction) => {
                const isSelected = infraction.id === activeId
                const meta = infraction.response?.metadata?.[0]
                const plate = meta?.plate
                  ? meta.plate.toUpperCase()
                  : `#${infraction.id}`
                const dateStr = infraction.response?.file?.date ?? ''
                const time = dateStr
                  ? (dateStr.split('T')[1]?.substring(0, 8) ??
                    dateStr.split(' ')[1] ??
                    dateStr)
                  : ''

                return (
                  <InfractionsSidebar.List.Item.Root
                    key={infraction.id}
                    isSelected={isSelected}
                    onSelect={() => handleSelect(infraction.id)}
                  >
                    <InfractionsSidebar.List.Item.Thumbnail
                      src={infraction.response?.file?.url}
                      plate={plate}
                    />
                    <InfractionsSidebar.List.Item.Info
                      plate={plate}
                      time={time}
                      isSelected={isSelected}
                    />
                  </InfractionsSidebar.List.Item.Root>
                )
              })}
            </InfractionsSidebar.List>
          </InfractionsSidebar.Root>

          <InfractionViewer.Root>
            <InfractionViewer.Image src={activeImageUrl}>
              <InfractionViewer.Empty />
            </InfractionViewer.Image>
            <InfractionViewer.Strip>
              <InfractionsTimeline.Root>
                <InfractionsTimeline.Item.Root
                  key={activeInfraction.id}
                  isActive={true}
                  onSelect={() => true}
                >
                  <InfractionsTimeline.Item.Image
                    src={activeImageUrl}
                    alt={activeInfraction.response.file.name}
                  />
                  <InfractionsTimeline.Item.Label>
                    {activeInfraction.response.file.name}
                  </InfractionsTimeline.Item.Label>
                </InfractionsTimeline.Item.Root>
              </InfractionsTimeline.Root>
            </InfractionViewer.Strip>
          </InfractionViewer.Root>

          <InfractionDescription.Root>
            <InfractionDescription.Header
              id={activeInfraction.id}
              laneId={laneId}
            />
            <InfractionDescription.List>
              {activeMeta?.plate && (
                <InfractionDescription.Plate value={activeMeta.plate} />
              )}
              <div className="h-px bg-border/70 shrink-0" />
              <InfractionDescription.List.Item
                label="Velocidade"
                value={activeMeta?.velocity}
              />
              <InfractionDescription.List.Item
                label="Tipo de Infração"
                value={activeMeta?.type}
              />
              <InfractionDescription.List.Item
                label="Data / Hora"
                value={activeInfraction?.response.file.date}
                mono
              />
              <InfractionDescription.List.Item
                label="Localidade"
                value={location}
              />
            </InfractionDescription.List>
          </InfractionDescription.Root>
        </InfractionsPanel.Root>
      </InfractionsMenu.Content>
    </InfractionsMenu.Root>
  )
}
