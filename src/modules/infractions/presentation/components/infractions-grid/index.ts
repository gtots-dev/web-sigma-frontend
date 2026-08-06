import { InfractionsGridContainerComponent } from './infractions-grid-container.component'
import { InfractionsGridFooterComponent } from './infractions-grid-footer.component'
import { InfractionsGridFooterPlateComponent } from './infractions-grid-footer-plate.component'
import { InfractionsGridHeaderComponent } from './infractions-grid-header.component'
import { InfractionsGridHeaderDateComponent } from './infractions-grid-header-date.component'
import { InfractionsGridHeaderRestrictionComponent } from './infractions-grid-header-restriction.component'
import { InfractionsGridHeaderViolationComponent } from './infractions-grid-header-violation.component'
import { InfractionsGridImageComponent } from './infractions-grid-image.component'
import {
  InfractionsGridProvider,
  useInfractionGrid
} from './infractions-grid-provider.component'
import { InfractionsGridRootComponent } from './infractions-grid-root.component'

const Header = Object.assign(InfractionsGridHeaderComponent, {
  Date: InfractionsGridHeaderDateComponent,
  Violation: InfractionsGridHeaderViolationComponent,
  Restriction: InfractionsGridHeaderRestrictionComponent
})

const Footer = Object.assign(InfractionsGridFooterComponent, {
  Plate: InfractionsGridFooterPlateComponent
})

export const InfractionsGrid = {
  Container: InfractionsGridContainerComponent,
  Provider: InfractionsGridProvider,
  Root: InfractionsGridRootComponent,
  Image: InfractionsGridImageComponent,
  Content: InfractionsGridImageComponent,
  Header,
  Footer
}

export { useInfractionGrid }
