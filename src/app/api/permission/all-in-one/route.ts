import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { PostPermissionProfileAndFeaturesFactory } from '@/modules/permissions/infrastructure/factories/post-permission-profile-and-features.factory'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse> {
  const postPermissionProfileAndFeaturesFactory =
    PostPermissionProfileAndFeaturesFactory.create()
  try {
    const { token } = await auth()
    const permissionProfileAndFeatures = await req.json()
    await postPermissionProfileAndFeaturesFactory.execute(
      token,
      permissionProfileAndFeatures
    )
    return NextResponse.json({
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
