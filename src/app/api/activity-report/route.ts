import { PostActivityReportFactory } from '@/modules/activity-report/infrastructure/factories/post-activity-report.factory'
import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

const routerApi = RouterApiFactory.create()

export const POST = routerApi.POST<UrlParams>(
  async (_, req) => {
    const filter = await req.json()
    const postActivityReport = PostActivityReportFactory.create()
    return await postActivityReport.execute(filter)
  }
)
