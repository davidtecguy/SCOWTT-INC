'use client'

import { useState } from 'react'

interface FavoriteMovieFormProps {
  userId: string
  onComplete: () => void
}

export default function FavoriteMovieForm({ userId, onComplete }: FavoriteMovieFormProps) {
  const [movieName, setMovieName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!movieName.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/user/favorite-movie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          favoriteMovie: movieName.trim(),
        }),
      })

      if (response.ok) {
        onComplete()
      } else {
        throw new Error('Failed to save favorite movie')
      }
    } catch (error) {
      console.error('Error saving favorite movie:', error)
      alert('Failed to save your favorite movie. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Tell us about your favorite movie!
      </h2>
      <p className="text-gray-600 mb-6">
        We'll use this information to show you interesting facts about your favorite movie.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="movieName" className="block text-sm font-medium text-gray-700 mb-2">
            What's your favorite movie?
          </label>
          <input
            type="text"
            id="movieName"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            placeholder="e.g., The Shawshank Redemption"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || !movieName.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          {isSubmitting ? 'Saving...' : 'Save Favorite Movie'}
        </button>
      </form>
    </div>
  )
} 