import React from 'react'
import { Carousel } from 'react-bootstrap'
import '../Styles/ResultCarousel.css'
import { upcomingMovies, imageBaseUrl } from '../../api'
import { useMovies } from '../../hooks/useMovies'

const ResultCarousel = props => {
  const [movies, error] = useMovies(upcomingMovies)

  const result = movies.map((movie, index) => {
    return (
      <Carousel.Item key={`${movie.id} ${movie.title}`}>
        <img className="d-block" src={`${imageBaseUrl}${movie.backdrop_path}`} alt={movie.name} />
        <Carousel.Caption>
          <h4>Upcoming Movies</h4>
          <span className="title">
            <h1>{movie.title}</h1>
          </span>
          <p>{movie.overview}</p>
          <h1>Release Date- {movie.release_date}</h1>
        </Carousel.Caption>
      </Carousel.Item>
    )
  })
  return <Carousel className="carousel_images">{result}</Carousel>
}
export default ResultCarousel
