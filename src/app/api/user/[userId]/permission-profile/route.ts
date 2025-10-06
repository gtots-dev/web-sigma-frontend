import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import { GetUserWithPermissionProfileFactory } from '@/modules/users/infrastructure/factories/get-user-with-permission-profile.factory'
import { PostBindUserWithPermissionProfileFactory } from '@/modules/users/infrastructure/factories/post-bind-user-with-permission-profile.factory'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: UserEntity['id'] }> }
): Promise<NextResponse> {
  try {
    const { userId } = await params
    const permissionProfileIds = await req.json()
    const { token } = await auth()
    const postBindUserWithPermissionProfileFactory =
      PostBindUserWithPermissionProfileFactory.create()
    await postBindUserWithPermissionProfileFactory.execute(
      token,
      permissionProfileIds,
      userId
    )
    return NextResponse.json({
      status: Number(HttpStatusCodeEnum.OK)
    })
  } catch (error) {
    if (error instanceof HttpResponseError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message
        },
        { status: Number(HttpStatusCodeEnum.BAD_REQUEST) }
      )
    }
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: UserEntity['id'] }> }
): Promise<NextResponse> {
  try {
    const { userId } = await params
    const { token } = await auth()
    const getUserWithPermissionProfileFactory =
      GetUserWithPermissionProfileFactory.create()
    const response = await getUserWithPermissionProfileFactory.execute(
      token,
      userId
    )
    return NextResponse.json(response, {
      status: Number(HttpStatusCodeEnum.OK)
    })
  } catch (error) {
    if (error instanceof HttpResponseError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message
        },
        { status: Number(HttpStatusCodeEnum.BAD_REQUEST) }
      )
    }
  }
}
