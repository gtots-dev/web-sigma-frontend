import { SelectOperationFactory } from '@/modules/api/infrastructure/factories/select-operation.factory'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { OperationFactory } from '@/modules/operations/infrastructure/factories/operation.factory'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { id, name } = await req.json()
    if (!id || !name) {
      throw new Error('Missing fields')
    }

    const operation = OperationFactory.create({
      id,
      name
    })
    const response = NextResponse.json({ message: 'Operation Selected' })
    const repository = SelectOperationFactory.create(req, response)
    repository.saveToCookies(operation)

    return response
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Invalid request' },
      { status: Number(HttpStatusCodeEnum.BAD_REQUEST) }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const response = NextResponse.next()
    const repository = SelectOperationFactory.create(req, response)
    const operation = repository.getFromCookies()

    if (!operation) {
      return NextResponse.json(
        { error: 'No operation found' },
        { status: Number(HttpStatusCodeEnum.NOT_FOUND) }
      )
    }

    return NextResponse.json(operation)
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid cookie data', error: error },
      { status: Number(HttpStatusCodeEnum.BAD_REQUEST) }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const response = NextResponse.json({
      message: 'Operation selection removed'
    })
    const repository = SelectOperationFactory.create(req, response)
    repository.removeFromCookies()
    return response
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to remove operation selection', error: error },
      { status: Number(HttpStatusCodeEnum.BAD_REQUEST) }
    )
  }
}
