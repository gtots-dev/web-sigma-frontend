import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { GetPermissionProfilesFactory } from '@/modules/permissions/infrastructure/factories/get-permission-profiles.factory'
import { PostPermissionProfileFactory } from '@/modules/permissions/infrastructure/factories/post-permission-profile.factory'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { NextResponse, type NextRequest } from 'next/server'

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

export async function GET(): Promise<NextResponse> {
  const { token } = await auth()
  const getPermissionProfilesFactory = GetPermissionProfilesFactory.create()
  try {
    const response = await getPermissionProfilesFactory.execute(token)
    return NextResponse.json(response, {
      status: Number(HttpStatusCodeEnum.OK)
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
