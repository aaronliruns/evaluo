import { NextResponse } from 'next/server'
import { testData } from '@/lib/data'

export async function GET() {
  try {
    return NextResponse.json(testData)
  } catch (error) {
    console.error('Error fetching test:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
