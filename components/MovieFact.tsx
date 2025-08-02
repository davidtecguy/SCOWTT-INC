'use client'

import { useState, useEffect } from 'react'

interface MovieFactProps {
  userId: string
}

export default function MovieFact({ userId }: MovieFactProps) {
  const [fact, setFact] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  const fetchMovieFact = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/movie-fact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch movie fact')
      }

      const data = await response.json()
      setFact(data.fact)
    } catch (err) {
      setError('Failed to load movie fact. Please try refreshing the page.')
      console.error('Error fetching movie fact:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovieFact()
  }, [userId])

  const handleRefresh = () => {
    fetchMovieFact()
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Movie Fact of the Day
        </h2>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors"
        >
          {isLoading ? 'Loading...' : 'New Fact'}
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Generating an interesting fact...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
          <p className="text-lg text-gray-800 leading-relaxed">{fact}</p>
        </div>
      )}
    </div>
  )
} 