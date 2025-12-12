import { useState, useEffect } from 'react'
import movieData from './data/movies.json'

export default function GetData() {
  const url = 'http://localhost:4000/movies'
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('API failed')
        return response.json()
      })
      .then(data => setMovies(data.movies || data))
      .catch(error => {
        console.error('Error fetching movies, using local data:', error)
        setMovies(movieData.movies)
      })
  }, [])

  const filteredMovies = movies.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='p-8'>
      <div className='mb-6'>
        <input
          type='text'
          placeholder='Search movies by title...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='w-full px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-600 focus:outline-none focus:border-blue-500 placeholder-neutral-400'
        />
      </div>

      <div className='grid grid-cols-2 gap-5 text-white'>
        {filteredMovies.map(item => (
          <div
            key={item.id}
            className='flex p-4 text-left rounded-md border border-neutral-400 bg-black/50 hover:bg-black/80 hover:shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out'
          >
            <div className='flex flex-col gap-3 flex-1 bg-neutral-900'>
              <h1 className='line-clamp-2 font-bold text-lg bg-neutral-900'>
                {item.title}
              </h1>
              <p className='line-clamp-4 text-sm bg-neutral-900'>
                {item.description}
              </p>
            </div>
            <img
              src={item.url}
              alt={item.title}
              className='w-52 h-78 object-cover rounded-md ml-4 bg-neutral-900'
            />
          </div>
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <p className='text-center text-neutral-400 mt-8'>No movies found</p>
      )}
    </div>
  )
}
