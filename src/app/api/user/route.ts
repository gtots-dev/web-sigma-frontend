import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { JwtTokenDecodeFactory } from '@/modules/shared/infrastructure/factories/jwt-decode.factory'
import { GetUsersFactory } from '@/modules/users/infrastructure/factories/get-users.factory'
import { PostUserFactory } from '@/modules/users/infrastructure/factories/post-user.factory'
import { PutUserFactory } from '@/modules/users/infrastructure/factories/put-user.factory'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { token } = await auth()
  const postUserFactory = PostUserFactory.create()
  const jwtDecode = JwtTokenDecodeFactory.create()
  const user = await req.formData()
  const { id } = jwtDecode.decode(token.access_token)
  try {
    const response = await postUserFactory.execute(token, user, id)
    return NextResponse.json(
      {
        success: true,
        data: response
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

export async function GET(): Promise<NextResponse> {
  const { token } = await auth()
  const getUsersFactory = GetUsersFactory.create()
  try {
    const response = await getUsersFactory.execute(token)
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
