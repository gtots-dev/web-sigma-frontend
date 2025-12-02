import { ViewMorePointMenuProvider } from '../../contexts/view-more-point-menu.context'
import { ViewMorePointGroupComponent } from './view-more-point-group.component'
import { ViewMorePointItemComponent } from './view-more-point-item.component'
import { ViewMorePointMenuContentComponent } from './view-more-point-menu-content.component'
import { ViewMorePointMenuFooterComponent } from './view-more-point-menu-footer.component'
import { ViewMorePointMenuHeaderComponent } from './view-more-point-menu-header.component'
import { ViewMorePointMenuRootComponent } from './view-more-point-menu-root.component'
import { ViewMorePointMenuTriggerComponent } from './view-more-point-menu-trigger.component'

export const ViewMorePointMenu = {
  Root: ViewMorePointMenuRootComponent,
  Trigger: ViewMorePointMenuTriggerComponent,
  Content: ViewMorePointMenuContentComponent,
  Footer: ViewMorePointMenuFooterComponent,
  Header: ViewMorePointMenuHeaderComponent,
  Provider: ViewMorePointMenuProvider,
  Group: ViewMorePointGroupComponent,
  Item: ViewMorePointItemComponent
}
