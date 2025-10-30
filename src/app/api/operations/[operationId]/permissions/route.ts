import { auth } from '@/auth'
import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import { GetPermissionProfilesFactory } from '@/modules/permissions/infrastructure/factories/get-permission-profiles.factory'
import { PostPermissionProfileFactory } from '@/modules/permissions/infrastructure/factories/post-permission-profile.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { NextResponse, type NextRequest } from 'next/server'

const routerApi = RouterApiFactory.create()

export async function POST(req: NextRequest): Promise<NextResponse> {
  const postPermissionProfileFactory = PostPermissionProfileFactory.create()
  try {
    const { token } = await auth()
    const permissionProfile = await req.json()
    const response = await postPermissionProfileFactory.execute(
      token,
      permissionProfile
    )
    return NextResponse.json(response, {
      status: Number(HttpStatusCodeEnum.CREATE)
    })
  } catch (error) {
    if (error instanceof HttpResponseError) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: error.message
        },
        { status: Number(HttpStatusCodeEnum.BAD_REQUEST) }
      )
    }
  }
}

export const GET = routerApi.GET<UrlParams, PermissionProfileInterface[]>(
  async ({ operationId }) => {
    const getPermissionProfiles = GetPermissionProfilesFactory.create({
      operationId
    })
    const response = await getPermissionProfiles.execute()
    return { data: response, status: HttpStatusCodeEnum.OK }
  }
)
