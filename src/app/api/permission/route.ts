import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { GetPermissionProfilesFactory } from '@/modules/permissions/infrastructure/factories/get-permission-profiles.factory'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { NextResponse } from 'next/server'

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
