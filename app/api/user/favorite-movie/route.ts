import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { favoriteMovie: true }
    })

    return NextResponse.json({ favoriteMovie: user?.favoriteMovie || null })
  } catch (error) {
    console.error('Error fetching favorite movie:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, favoriteMovie } = await request.json()

    if (!userId || !favoriteMovie) {
      return NextResponse.json(
        { error: 'User ID and favorite movie are required' },
        { status: 400 }
      )
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { favoriteMovie },
      select: { favoriteMovie: true }
    })

    return NextResponse.json({ favoriteMovie: updatedUser.favoriteMovie })
  } catch (error) {
    console.error('Error saving favorite movie:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 