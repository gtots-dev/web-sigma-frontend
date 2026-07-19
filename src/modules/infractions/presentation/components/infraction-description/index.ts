import { InfractionDescriptionRoot } from './infraction-description-root.component'
import { InfractionDescriptionHeader } from './infraction-description-header.component'
import { InfractionDescriptionPlate } from './infraction-description-plate.component'
import { InfractionDescriptionList } from './infraction-description-list.component'
import { InfractionDescriptionListItem } from './infraction-description-list-item.component'

const List = Object.assign(InfractionDescriptionList, {
  Item: InfractionDescriptionListItem,
})

export const InfractionDescription = {
  Root: InfractionDescriptionRoot,
  Header: InfractionDescriptionHeader,
  Plate: InfractionDescriptionPlate,
  List,
}
