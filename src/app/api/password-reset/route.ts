import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { PutPasswordResetFactory } from '@/modules/password-reset/infrastructure/factories/put-password-reset.factory'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const putPasswordResetFactory = PutPasswordResetFactory.create()
  const { token, newPassword } = await req.json()
  try {
    await putPasswordResetFactory.execute({ token, newPassword })
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
