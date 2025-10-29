import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import { GetUserFilesFactory } from '@/modules/users/infrastructure/factories/get-user-files.factory'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: UserEntity['id'] }> }
): Promise<NextResponse> {
  try {
    const { userId } = await params
    const { token } = await auth()
    const getUserFilesFactory = GetUserFilesFactory.create()
    const response = await getUserFilesFactory.execute(token, userId)
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
