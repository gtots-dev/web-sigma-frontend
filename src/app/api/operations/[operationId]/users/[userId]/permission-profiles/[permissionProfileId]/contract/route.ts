import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { NextResponse, type NextRequest } from 'next/server'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import { auth } from '@/auth'
import { GetUserPermissionProfileContractFactory } from '@/modules/users/infrastructure/factories/get-user-permission-profiles-contract.factory'

export async function GET(
  req: NextRequest,
  {
    params
  }: {
    params: Promise<{
      userId: UserEntity['id']
      permissionProfileId: PermissionProfileInterface['id']
    }>
  }
): Promise<NextResponse> {
  try {
    const { permissionProfileId, userId } = await params
    const { token } = await auth()
    const getUserPermissionProfileContractFactory =
      GetUserPermissionProfileContractFactory.create()
    const response = await getUserPermissionProfileContractFactory.execute(
      token,
      userId,
      permissionProfileId
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
