import { InfractionsFiltersBodyComponent } from './infractions-filters-body.component'
import { InfractionsFiltersHeaderComponent } from './infractions-filters-header.component'
import { InfractionsFiltersHeaderDescriptionComponent } from './infractions-filters-header-description.component'
import { InfractionsFiltersHeaderIconComponent } from './infractions-filters-header-icon.component'
import { InfractionsFiltersHeaderTitleComponent } from './infractions-filters-header-title.component'
import { InfractionsFiltersHeaderToggleComponent } from './infractions-filters-header-toggle.component'
import { InfractionsFiltersRoot } from './infractions-filters-root.component'

const HeaderCompound = Object.assign(InfractionsFiltersHeaderComponent, {
  Root: InfractionsFiltersHeaderComponent,
  Title: InfractionsFiltersHeaderTitleComponent,
  Description: InfractionsFiltersHeaderDescriptionComponent,
  Icon: InfractionsFiltersHeaderIconComponent,
  Toggle: InfractionsFiltersHeaderToggleComponent
})

export const InfractionsFilters = {
  Root: InfractionsFiltersRoot,
  Header: HeaderCompound,
  Title: InfractionsFiltersHeaderTitleComponent,
  Description: InfractionsFiltersHeaderDescriptionComponent,
  Icon: InfractionsFiltersHeaderIconComponent,
  Toggle: InfractionsFiltersHeaderToggleComponent,
  Body: InfractionsFiltersBodyComponent,
  Content: InfractionsFiltersBodyComponent
}