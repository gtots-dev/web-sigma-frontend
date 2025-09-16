import { ViewMoreActivityReportGroupDataComponent } from './view-more-activity-report-group-data.component'
import { ViewMoreActivityReportItemDataComponent } from './view-more-activity-report-item-data.component'
import { ViewMoreActivityReportMenuContentComponent } from './view-more-activity-report-menu-content.component'
import { ViewMoreActivityReportMenuFooterComponent } from './view-more-activity-report-menu-footer.component'
import { ViewMoreActivityReportMenuHeaderComponent } from './view-more-activity-report-menu-header.component'
import { ViewMoreActivityReportMenuProviderComponent } from './view-more-activity-report-menu-provider.component'
import { ViewMoreActivityReportMenuRootComponent } from './view-more-activity-report-menu-root.component'
import { ViewMoreActivityReportMenuTriggerComponent } from './view-more-activity-report-menu-trigger.component'

export const ViewMoreActivityReportMenu = {
  Trigger: ViewMoreActivityReportMenuTriggerComponent,
  Root: ViewMoreActivityReportMenuRootComponent,
  Content: ViewMoreActivityReportMenuContentComponent,
  Footer: ViewMoreActivityReportMenuFooterComponent,
  Header: ViewMoreActivityReportMenuHeaderComponent,
  Provider: ViewMoreActivityReportMenuProviderComponent,
  Group: ViewMoreActivityReportGroupDataComponent,
  Item: {
    data: ViewMoreActivityReportItemDataComponent
  }
}
