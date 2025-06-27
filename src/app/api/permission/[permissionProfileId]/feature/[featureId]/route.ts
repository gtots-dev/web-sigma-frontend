import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { DeleteFeatureFactory } from '@/modules/permissions/infrastructure/factories/delete-feature.factory'
import { NextResponse, type NextRequest } from 'next/server'
import type { GetStaticPropsContext } from 'next'

export async function DELETE(
  req: NextRequest,
  context: GetStaticPropsContext<{
    permissionProfileId: string
    featureId: string
  }>
): Promise<NextResponse> {
  const { featureId, permissionProfileId } = context.params
  try {
    const { token } = await auth()
    const deleteFeatureFactory = DeleteFeatureFactory.create()
    deleteFeatureFactory.execute(
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
