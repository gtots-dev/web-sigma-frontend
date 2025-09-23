import { ActivityReportFormSubmitComponent } from '@/modules/activity-report/presentation/components/activity-report-form/activity-report-form-submit.component'
import { ActivityReportDateRangeComponent } from './activity-report-form-input-date.component'
import { ActivityReportFormComponent } from './activity-report-form.component'
import { ActivityReportFormProviderComponent } from './activity-report-form-provider.component'
import { ActivityReportFormInputSearchComponent } from './activity-report-form-input-search.component'
import { ActivityReportTimeRangeComponent } from './activity-report-form-input-time.component'
import { ActivityReportContractsComponent } from './activity-report-form-input-contracts.component'
import { ActivityReportUsersComponent } from './activity-report-form-input-users.component'
import { ActivityReportOperationsComponent } from './activity-report-form-input-operations.component'

export const ActivityReportForm = {
  Provider: ActivityReportFormProviderComponent,
  Form: ActivityReportFormComponent,
  Submit: ActivityReportFormSubmitComponent,
  Inputs: {
    Operations: ActivityReportOperationsComponent,
    Contracts: ActivityReportContractsComponent,
    Users: ActivityReportUsersComponent,
    Search: ActivityReportFormInputSearchComponent,
    Time: ActivityReportTimeRangeComponent,
    Date: ActivityReportDateRangeComponent
  }
}
