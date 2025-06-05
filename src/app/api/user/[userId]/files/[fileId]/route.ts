import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import type { UserFileInterface } from '@/modules/users/domain/interfaces/user-file.interface'
import { GetUserFileFactory } from '@/modules/users/infrastructure/factories/get-user-file.factory'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  {
    params
  }: {
    params: Promise<{
      userId: UserEntity['id']
      fileId: UserFileInterface['id']
    }>
  }
): Promise<File | NextResponse> {
  try {
    const { fileId, userId } = await params
    const { token } = await auth()
    const getUserFileFactory = GetUserFileFactory.create()
    const response = await getUserFileFactory.execute(token, userId, fileId)
    return new NextResponse(response, {
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
