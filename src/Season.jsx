import React from 'react';
import Container from "react-bootstrap/Container"
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

function Season({numberOfEpisodes, seasonNumber, airDate}) {
  
  return (
    <Container>
      <h1>Season {seasonNumber}</h1>
      <h6>{`${numberOfEpisodes} episodes | Aired ${dayjs(airDate).format('ll')}`}</h6>
    </Container>
  )
}

export default Season
