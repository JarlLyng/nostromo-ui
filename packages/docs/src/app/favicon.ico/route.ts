import { NextResponse } from 'next/server'

export async function GET() {
  // Return a simple favicon response
  return new NextResponse(null, {
    status: 404,
  })
}
