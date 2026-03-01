import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
    { status: StatusCodes.OK },
  )
}
