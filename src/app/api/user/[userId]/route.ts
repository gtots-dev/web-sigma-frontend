import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import { PutUserFactory } from '@/modules/users/infrastructure/factories/put-user.factory'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ userId: UserEntity['id'] }> }
): Promise<NextResponse> {
  try {
    const user = await req.formData()
    const { token } = await auth()
    const { userId } = await params
    const putUserFactory = PutUserFactory.create()
    await putUserFactory.execute(token, userId, user)
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
