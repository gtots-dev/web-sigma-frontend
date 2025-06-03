import { NextResponse, type NextRequest } from 'next/server'
import { auth } from '@/auth'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { GetContractsFactory } from '@/modules/contracts/infrastructure/factories/get-contracts.factory'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { PostContractFactory } from '@/modules/contracts/infrastructure/factories/post-contract.factory'

export async function GET(): Promise<NextResponse> {
  try {
    const { token } = await auth()
    const getContractsFactory = GetContractsFactory.create()
    const response = await getContractsFactory.execute(token)
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

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { token } = await auth()
    const contract = await req.json()
    const postContract = PostContractFactory.create()
    await postContract.execute(token, contract)
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
