import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { GetUserFileFactory } from '@/modules/users/infrastructure/factories/get-user-file.factory'
import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<UrlParams, File>(
  async ({ operationId, userId, fileId }) => {
    const getUserFileFactory = GetUserFileFactory.create({
      operationId,
      userId,
      fileId
    })
    const fileBlob = await getUserFileFactory.execute()
    return {
      data: fileBlob,
      status: HttpStatusCodeEnum.OK,
      headers: {
        'Content-Type': fileBlob.type || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileId}"`
      }
    }
  }
)
