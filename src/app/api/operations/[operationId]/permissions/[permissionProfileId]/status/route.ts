import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import { PutPermissionProfileStatusFactory } from '@/modules/permissions/infrastructure/factories/put-permission-profile-status.factory'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'

import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  req: NextRequest,
  {
    params
  }: { params: Promise<{ permissionProfileId: PermissionProfileEntity['id'] }> }
): Promise<NextResponse> {
  try {
    const permissionProfileEnableAndDisable = await req.json()
    const { token } = await auth()
    const { permissionProfileId } = await params
    const putPermissionProfileStatusFactory =
      PutPermissionProfileStatusFactory.create()
    await putPermissionProfileStatusFactory.execute(
      token,
      permissionProfileId,
      permissionProfileEnableAndDisable
    )
    return NextResponse.json(
      {
        success: true
      },
      { status: Number(HttpStatusCodeEnum.OK) }
    )
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
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Erro inesperado'
      },
      { status: Number(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR) }
    )
  }
}
