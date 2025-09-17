import { ActivityReportFormSubmitComponent } from '@/modules/activity-report/presentation/components/activity-report-form/activity-report-form-submit.component'
import { ActivityReportDateRangeComponent } from './activity-report-form-input-date.component'
import { ActivityReportFormComponent } from './activity-report-form.component'
import { ActivityReportFormProviderComponent } from './activity-report-form-provider.component'

export const ActivityReportForm = {
  Provider: ActivityReportFormProviderComponent,
  Form: ActivityReportFormComponent,
  Submit: ActivityReportFormSubmitComponent,
  Inputs: {
    Date: ActivityReportDateRangeComponent
  }
}
