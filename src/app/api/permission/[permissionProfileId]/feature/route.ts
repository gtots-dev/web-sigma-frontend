import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import { PostFeatureFactory } from '@/modules/permissions/infrastructure/factories/post-feature.factory'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(
  req: NextRequest,
  {
    params
  }: {
    params: Promise<{ permissionProfileId: PermissionProfileInterface['id'] }>
  }
): Promise<NextResponse> {
  const postFeatureFactory = PostFeatureFactory.create()
  try {
    const { token } = await auth()
    const { permissionProfileId } = await params
    const features = await req.json()
    await postFeatureFactory.execute(token, features, permissionProfileId)
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
