import { useState, useEffect } from 'react'

const useMovies = url => {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) throw Error(`It went wrong ${response.status} ${response.statusText}`)
        return response.json()
      })
      .then(data => {
        setMovies(data.results.filter(m => m.backdrop_path))
      })
      .catch(err => setError(err.message))
  }, [url])

  return [movies, error]
}

export { useMovies }
