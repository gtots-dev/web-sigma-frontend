import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { NextResponse, type NextRequest } from 'next/server'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import { auth } from '@/auth'
import { DeleteBindUserWithPermissionProfileFactory } from '@/modules/users/infrastructure/factories/delete-bind-user-with-permission-profile.factory'

export async function DELETE(
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
    const deleteBindUserWithPermissionProfileFactory =
      DeleteBindUserWithPermissionProfileFactory.create()
    deleteBindUserWithPermissionProfileFactory.execute(
      token,
      permissionProfileId,
      userId
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
