import React, { useEffect, useState } from 'react'
import { Container, Card, Col, Row, Button } from 'react-bootstrap'
import { useTrail, animated, config } from 'react-spring'

import ModalTrailer from '../Result/ModalTrailer'

const imageBaseUrl = 'https://image.tmdb.org/t/p/original/'

const SharedResults = ({ url }) => {
  const [movies, setMovies] = useState([])
  const [modal, setModalId] = useState(null)

  const trail = useTrail(movies.length, {
    opacity: 1,
    transform: 'translate3d(0,0,0)',
    from: {
      opacity: 0,
      transform: 'translate3d(0,+50px,0)'
    },
    config: config.stiff
  })

  useEffect(() => {
    fetch(url)
      .then(response => {
        if (!response.ok)
          throw Error(`It went wrong ${response.status} message: ${response.statusText}`)
        return response.json()
      })
      .then(data => {
        setMovies(data.results.filter(m => m.backdrop_path))
      })
      .catch(console.log)
  }, [url])

  const showMovies = trail.map((props, index) => {
    const movie = movies[index]
    return (
      <animated.div style={props} key={movie.id} className="my-4 col-lg-4 col-md-4 col-12">
        <Card className="my-3 h-100 shadow">
          <Card.Img
            variant="top"
            src={`${imageBaseUrl}${movie.backdrop_path || movie.poster_path}`}
          />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <span className="text-center">
              <Button onClick={e => setModalId(movie.id)} className="trailer-button">
                Trailer
              </Button>
            </span>
          </Card.Body>
        </Card>
      </animated.div>
    )
  })

  return (
    <Container>
      <Row>{showMovies}</Row>
      {modal && <ModalTrailer movieId={modal} closeCallback={() => setModalId(null)} />}
    </Container>
  )
}

export default SharedResults
