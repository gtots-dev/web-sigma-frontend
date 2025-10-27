import { NextResponse, type NextRequest } from 'next/server'
import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { PutContractStatusFactory } from '@/modules/contracts/infrastructure/factories/put-contract-status.factory'

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const { token } = await auth()
    const contract = await req.json()
    const putContractStatus = PutContractStatusFactory.create()
    await putContractStatus.execute(token, contract)
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
