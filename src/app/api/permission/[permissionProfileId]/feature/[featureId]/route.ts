import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { DeleteFeatureFactory } from '@/modules/permissions/infrastructure/factories/delete-feature.factory'
import { NextResponse, type NextRequest } from 'next/server'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import type { FeaturesInterface } from '@/modules/permissions/domain/interfaces/features.interface'

export async function DELETE(
  req: NextRequest,
  {
    params
  }: {
    params: Promise<{
      featureId: FeaturesInterface['id']
      permissionProfileId: PermissionProfileInterface['id']
    }>
  }
): Promise<NextResponse> {
  try {
    const { permissionProfileId, featureId } = await params
    const { token } = await auth()
    const deleteFeatureFactory = DeleteFeatureFactory.create()
    await deleteFeatureFactory.execute(
      token,
      Number(featureId),
      Number(permissionProfileId)
    )
    return NextResponse.json({ status: Number(HttpStatusCodeEnum.OK) })
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
