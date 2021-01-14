import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

function ShowHeader({show}) {
  console.log(show)
  let { genres, image, name, premiered, summary } = show;
  console.log(genres, image, name, premiered, summary)
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <img src={image.medium} alt='poster' />
          </Col>
          <Col>
          <h2>{name}</h2>
          <p>{`${genres.join(', ')} | Premiered on ${dayjs(premiered).format('ll')}`}</p>
          <p>{summary}</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ShowHeader;
