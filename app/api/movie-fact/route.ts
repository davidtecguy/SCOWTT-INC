import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Get user's favorite movie
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { favoriteMovie: true }
    })

    if (!user?.favoriteMovie) {
      return NextResponse.json(
        { error: 'User has no favorite movie set' },
        { status: 400 }
      )
    }

    // Generate interesting fact using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a movie expert who provides interesting, fun, and accurate facts about movies. Keep responses engaging and informative, around 2-3 sentences."
        },
        {
          role: "user",
          content: `Tell me one interesting fact about the movie "${user.favoriteMovie}". Make it fun and engaging.`
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    })

    const fact = completion.choices[0]?.message?.content || 'Unable to generate fact at this time.'

    return NextResponse.json({ fact })
  } catch (error) {
    console.error('Error generating movie fact:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 