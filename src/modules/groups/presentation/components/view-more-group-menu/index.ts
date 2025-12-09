import { ViewMoreGroupMenuProvider } from '../../contexts/view-more-group-menu.context'
import { ViewMoreGroupGroupComponent } from './view-more-group-group.component'
import { ViewMoreGroupItemComponent } from './view-more-group-item.component'
import { ViewMoreGroupMenuContentComponent } from './view-more-group-menu-content.component'
import { ViewMoreGroupMenuFooterComponent } from './view-more-group-menu-footer.component'
import { ViewMoreGroupMenuHeaderComponent } from './view-more-group-menu-header.component'
import { ViewMoreGroupMenuRootComponent } from './view-more-group-menu-root.component'
import { ViewMoreGroupMenuTriggerComponent } from './view-more-group-menu-trigger.component'

export const ViewMoreGroupMenu = {
  Root: ViewMoreGroupMenuRootComponent,
  Trigger: ViewMoreGroupMenuTriggerComponent,
  Content: ViewMoreGroupMenuContentComponent,
  Footer: ViewMoreGroupMenuFooterComponent,
  Header: ViewMoreGroupMenuHeaderComponent,
  Provider: ViewMoreGroupMenuProvider,
  Group: ViewMoreGroupGroupComponent,
  Item: ViewMoreGroupItemComponent
}
