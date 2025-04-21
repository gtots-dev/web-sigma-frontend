import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { JwtTokenDecodeFactory } from '@/modules/shared/infrastructure/factories/jwt-decode.factory'
import { PostUserFactory } from '@/modules/users/infrastructure/factories/post-user.factory'
import { PutUserFactory } from '@/modules/users/infrastructure/factories/put-user.factory'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { token } = await auth()
  const postUserFactory = PostUserFactory.create()
  const jwtDecode = JwtTokenDecodeFactory.create()
  const user = await req.json()
  const { id } = jwtDecode.decode(token.access_token)
  try {
    const response = await postUserFactory.execute(token, user, id)
    console.table(response)
    return NextResponse.json({
      success: true,
      status: String(HttpStatusCodeEnum.OK),
      data: response
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: String(HttpStatusCodeEnum.BAD_REQUEST),
      data: null
    })
  }
}

export async function PUT(req: NextRequest) {
  const { token } = await auth()
  const putUserFactory = PutUserFactory.create()
  const user = await req.json()
  try {
    const response = await putUserFactory.execute(token, user)
    console.table(response)
    return NextResponse.json({
      success: true,
      status: String(HttpStatusCodeEnum.OK),
      data: response
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: String(HttpStatusCodeEnum.BAD_REQUEST),
      data: null
    })
  }
}
