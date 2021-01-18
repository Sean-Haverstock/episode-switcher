import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

function Episode({name, season, summary, image, episodeNumber, airdate}) {
  return (
    <Container>
      <Row>
          <Col>
          {image || image.medium ? <img src={image.medium} alt='poster' /> : <div>n/a</div>}
          </Col>
          <Col>
          <h2>{name}</h2>
          <p>{airdate ? `Season ${season} | Episode ${episodeNumber} | ${dayjs(airdate).format('ll')}` : `Season ${season} | Episode ${episodeNumber}`}</p>
          <p>{summary ? summary.replace( /(<([^>]+)>)/ig, '') : ''}</p>
          </Col>
        </Row>
    </Container>
  )
}

export default Episode;
