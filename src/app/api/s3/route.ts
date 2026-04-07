import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'

const routerApi = RouterApiFactory.create()

export const POST = routerApi.POST<UrlParams>(async (_, req) => {
  const formJson = await req?.json()
  const parsedUrl = new URL(formJson.url)
  const url = parsedUrl.pathname + parsedUrl.search
  const filename = parsedUrl.pathname.split('/').pop()
  const httpClient = HttpClientFactory.create(parsedUrl.origin)
  const executeRequest = ExecuteRequestFactory.create(httpClient)
  const { data: fileBlob } = await executeRequest.execute<File>({
    method: 'GET',
    url
  })
  
  return {
    data: fileBlob,
    status: HttpStatusCodeEnum.OK,
    headers: {
      'Content-Type': fileBlob.type || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${filename}"`
    },
    isFile: true
  }
})
