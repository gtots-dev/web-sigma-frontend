import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { GetUserMeFactory } from '@/modules/users/infrastructure/factories/get-user-me.factory'
import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
  const getUserMeFactory = GetUserMeFactory.create()
  try {
    const { token } = await auth()
    const response = await getUserMeFactory.execute(token)
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
