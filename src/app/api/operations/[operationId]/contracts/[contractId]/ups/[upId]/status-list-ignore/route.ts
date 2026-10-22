import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { GetStatusProcessingUnitIgnoreFactory } from '@/modules/status-processing-units/infrastructure/factories/get-status-processing-unit-ignore.factory'
import { PostStatusProcessingUnitIgnoreFactory } from '@/modules/status-processing-units/infrastructure/factories/post-status-processing-unit-ignore.factory'
import type {
  PostStatusProcessingUnitIgnoreInterface,
  StatusProcessingUnitIgnoreInterface
} from '@/modules/status-processing-units/domain/interfaces/status-processing-unit-ignore.interface'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<
  UrlParams,
  StatusProcessingUnitIgnoreInterface[]
>(async ({ operationId, contractId, upId }) => {
  const getIgnores = GetStatusProcessingUnitIgnoreFactory.create({
    operationId,
    contractId,
    upId
  })
  return await getIgnores.execute()
})

export const POST = routerApi.POST<
  UrlParams,
  StatusProcessingUnitIgnoreInterface
>(async ({ operationId, contractId, upId }, req) => {
  const body: PostStatusProcessingUnitIgnoreInterface = await req?.json()
  const postIgnore = PostStatusProcessingUnitIgnoreFactory.create({
    operationId,
    contractId,
    upId
  })
  return await postIgnore.execute(body)
})
