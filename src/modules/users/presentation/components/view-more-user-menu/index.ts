import { ViewMoreUserGroupDataComponent } from './view-more-user-group-data.component'
import { ViewMoreUserItemDataComponent } from './view-more-user-item-data.component'
import { ViewMoreUserItemFileComponent } from './view-more-user-item-file.component'
import { ViewMoreUserMenuContentComponent } from './view-more-user-menu-content.component'
import { ViewMoreUserMenuFooterComponent } from './view-more-user-menu-footer.component'
import { ViewMoreUserMenuHeaderComponent } from './view-more-user-menu-header.component'
import { ViewMoreUserMenuProviderComponent } from './view-more-user-menu-provider.component'
import { ViewMoreUserMenuRootComponent } from './view-more-user-menu-root.component'
import { ViewMoreUserMenuTriggerComponent } from './view-more-user-menu-trigger.component'

export const ViewMoreUserMenu = {
  Trigger: ViewMoreUserMenuTriggerComponent,
  Root: ViewMoreUserMenuRootComponent,
  Content: ViewMoreUserMenuContentComponent,
  Footer: ViewMoreUserMenuFooterComponent,
  Header: ViewMoreUserMenuHeaderComponent,
  Provider: ViewMoreUserMenuProviderComponent,
  Group: ViewMoreUserGroupDataComponent,
  Item: {
    data: ViewMoreUserItemDataComponent,
    file: ViewMoreUserItemFileComponent
  }
}
