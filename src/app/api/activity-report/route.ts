import { auth } from '@/auth'
import { PostActivityReportFactory } from '@/modules/activity-report/infrastructure/factories/post-activity-report.factory'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { token } = await auth()
  const postActivityReportFactory = PostActivityReportFactory.create()
  const filter = await req.json()
  try {
    const response = await postActivityReportFactory.execute(token, filter)
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
