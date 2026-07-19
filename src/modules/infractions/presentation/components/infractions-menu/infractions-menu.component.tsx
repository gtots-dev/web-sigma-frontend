'use client'

import { InfractionsMenu } from '.'
import { InfractionDescription } from '../infraction-description'
import { InfractionViewer } from '../infraction-viewer'
import { InfractionsPanel } from '../infractions-panel'
import { InfractionsSidebar } from '../infractions-sidebar'
import { InfractionsTimeline } from '../infractions-timeline'
import { useInfractionMedia } from '../../hooks/use-infraction-media.hook'
import { useInfractionsSelection } from '../../hooks/use-infractions-selection.hook'
import { formatInfractionSidebarItems } from '../../utils/format-infraction-sidebar-items.util'
import { resolveLocation } from '../../utils/resolve-location.util'
import { useInfractionsMenuContext } from '../../contexts/infractions-menu.context'

export function InfractionsMenuComponent() {
  const { isOpen, close, infractions, selectedInfraction } =
    useInfractionsMenuContext()

  const { activeId, handleSelect, activeInfraction, sortedInfractions } =
    useInfractionsSelection(infractions)

  const {
    activeAssetIndex,
    setActiveAssetIndex,
    activeMediaAssets,
    displaySrc
  } = useInfractionMedia(activeInfraction)

  if (infractions.length === 0) return <InfractionsPanel.Empty />
  if (!selectedInfraction) return null
  if (!activeInfraction) return null

  const activeMeta = activeInfraction.request.items.metadata[0] ?? null
  const listItems = formatInfractionSidebarItems(sortedInfractions)
  const location = resolveLocation(activeMeta)

  return (
    <InfractionsMenu.Root isOpen={isOpen} close={close}>
      <InfractionsMenu.Content className="md:max-w-[1200px] lg:max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] w-[98vw] !h-[95vh] p-3">
        <InfractionsPanel.Root>
          <InfractionsSidebar.Root>
            <InfractionsSidebar.Header count={listItems.length} />
            <InfractionsSidebar.List>
              {listItems.map(({ infraction, plate, thumbnailSrc, time }) => {
                const isSelected = infraction.id === activeId
                return (
                  <InfractionsSidebar.List.Item.Root
                    key={infraction.id}
                    isSelected={isSelected}
                    onSelect={() => handleSelect(infraction.id)}
                  >
                    <InfractionsSidebar.List.Item.Thumbnail
                      src={thumbnailSrc}
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
            <InfractionViewer.Image src={displaySrc}>
              <InfractionViewer.Empty />
            </InfractionViewer.Image>
            {activeMediaAssets.length > 0 && (
              <InfractionViewer.Strip>
                <InfractionsTimeline.Root>
                  {activeMediaAssets.map((asset, index) => {
                    const isActive = index === activeAssetIndex
                    return (
                      <InfractionsTimeline.Item.Root
                        key={index}
                        isActive={isActive}
                        onSelect={() => setActiveAssetIndex(index)}
                      >
                        {asset.type === 'image' && (
                          <InfractionsTimeline.Item.Image
                            src={asset.src}
                            alt={asset.label}
                          />
                        )}

                        {asset.type === 'video' && (
                          <InfractionsTimeline.Item.Video />
                        )}

                        <InfractionsTimeline.Item.Label>
                          {asset.label}
                        </InfractionsTimeline.Item.Label>
                      </InfractionsTimeline.Item.Root>
                    )
                  })}
                </InfractionsTimeline.Root>
              </InfractionViewer.Strip>
            )}
          </InfractionViewer.Root>

          <InfractionDescription.Root>
            <InfractionDescription.Header
              id={activeInfraction.id}
              laneId={activeInfraction.request.lane_id}
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
                value={activeMeta?.date}
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
