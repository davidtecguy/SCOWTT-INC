'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import MovieFact from '@/components/MovieFact'
import FavoriteMovieForm from '@/components/FavoriteMovieForm'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [hasFavoriteMovie, setHasFavoriteMovie] = useState<boolean | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.id) {
      checkFavoriteMovie()
    }
  }, [session?.user?.id])

  const checkFavoriteMovie = async () => {
    try {
      const response = await fetch(`/api/user/favorite-movie?userId=${session?.user?.id}`)
      const data = await response.json()
      setHasFavoriteMovie(!!data.favoriteMovie)
    } catch (error) {
      console.error('Error checking favorite movie:', error)
    }
  }

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    )
  }

  if (!session?.user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {session.user.name}!</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {/* User Profile Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            {session.user.image && (
              <img
                src={session.user.image}
                alt={session.user.name || 'User'}
                className="w-16 h-16 rounded-full"
              />
            )}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{session.user.name}</h2>
              <p className="text-gray-600">{session.user.email}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        {hasFavoriteMovie === null ? (
          <div className="text-center">Loading...</div>
        ) : hasFavoriteMovie ? (
          <MovieFact userId={session.user.id} />
        ) : (
          <FavoriteMovieForm 
            userId={session.user.id} 
            onComplete={() => setHasFavoriteMovie(true)} 
          />
        )}
      </div>
    </div>
  )
} 