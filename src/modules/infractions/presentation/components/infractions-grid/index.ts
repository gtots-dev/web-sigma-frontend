import { InfractionsGridContainerComponent } from './infractions-grid-container.component'
import { InfractionsGridFooterComponent } from './infractions-grid-footer.component'
import { InfractionsGridHeaderComponent } from './infractions-grid-header.component'
import { InfractionsGridImageComponent } from './infractions-grid-image.component'
import { InfractionsGridProvider, useInfractionGrid } from './infractions-grid-provider.component'
import { InfractionsGridRootComponent } from './infractions-grid-root.component'

export const InfractionsGrid = {
  Container: InfractionsGridContainerComponent,
  Provider: InfractionsGridProvider,
  Root: InfractionsGridRootComponent,
  Image: InfractionsGridImageComponent,
  Content: InfractionsGridImageComponent,
  Header: InfractionsGridHeaderComponent,
  Footer: InfractionsGridFooterComponent
}

export { useInfractionGrid }
