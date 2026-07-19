import { InfractionsMenuProvider } from '../../contexts/infractions-menu.context'
import { InfractionsMenuContentComponent } from './infractions-menu-content.component'
import { InfractionsMenuFooterComponent } from './infractions-menu-footer.component'
import { InfractionsMenuHeaderComponent } from './infractions-menu-header.component'
import { InfractionsMenuRootComponent } from './infractions-menu-root.component'
import { InfractionsMenuTriggerComponent } from './infractions-menu-trigger.component'
import { InfractionsMenuComponent } from './infractions-menu.component'

export const InfractionsMenu = {
  Root: InfractionsMenuRootComponent,
  Trigger: InfractionsMenuTriggerComponent,
  Content: InfractionsMenuContentComponent,
  Footer: InfractionsMenuFooterComponent,
  Header: InfractionsMenuHeaderComponent,
  Provider: InfractionsMenuProvider,
  Dialog: InfractionsMenuComponent
}

