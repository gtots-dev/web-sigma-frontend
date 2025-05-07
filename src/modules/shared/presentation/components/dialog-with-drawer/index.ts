import { DialogWithDrawerCloseComponent } from './dialog-with-drawer-close.component'
import { DialogWithDrawerContentComponent } from './dialog-with-drawer-content.component'
import { DialogWithDrawerDescriptionComponent } from './dialog-with-drawer-description.component'
import { DialogWithDrawerHeaderComponent } from './dialog-with-drawer-header.component'
import { DialogWithDrawerRootComponent } from './dialog-with-drawer-root.component'
import { DialogWithDrawerTitleComponent } from './dialog-with-drawer-title.component'
import { DialogWithDrawerTriggerComponent } from './dialog-with-drawer-trigger.component'

export const DrawerDialog = {
  Root: DialogWithDrawerRootComponent,
  Trigger: DialogWithDrawerTriggerComponent,
  Header: DialogWithDrawerHeaderComponent,
  Content: DialogWithDrawerContentComponent,
  Title: DialogWithDrawerTitleComponent,
  Description: DialogWithDrawerDescriptionComponent,
  Close: DialogWithDrawerCloseComponent
}
