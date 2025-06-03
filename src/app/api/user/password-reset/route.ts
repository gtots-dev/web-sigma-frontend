import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { PostUserPasswordResetFactory } from '@/modules/users/infrastructure/factories/post-user-password-reset.factory'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { token } = await auth()
  const postUserFactory = PostUserPasswordResetFactory.create()
  const userPasswordReset = await req.json()
  try {
    await postUserFactory.execute(token, userPasswordReset)
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
