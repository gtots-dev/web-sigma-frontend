import { PostVehicleMenuProvider } from '../../contexts/post-vehicle-menu.context'
import { PostVehicleMenuContentComponent } from './post-vehicle-menu-content.component'
import { PostVehicleMenuFooterComponent } from './post-vehicle-menu-footer.component'
import { PostVehicleMenuHeaderComponent } from './post-vehicle-menu-header.component'
import { PostVehicleMenuRootComponent } from './post-vehicle-menu-root.component'
import { PostVehicleMenuTriggerComponent } from './post-vehicle-menu-trigger.component'

export const PostVehicleMenu = {
  Root: PostVehicleMenuRootComponent,
  Trigger: PostVehicleMenuTriggerComponent,
  Content: PostVehicleMenuContentComponent,
  Footer: PostVehicleMenuFooterComponent,
  Header: PostVehicleMenuHeaderComponent,
  Provider: PostVehicleMenuProvider
}
