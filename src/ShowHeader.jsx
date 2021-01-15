import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

function ShowHeader({info}) {
  
  let { genres, image, name, premiered, summary } = info;
 
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
          <p>{summary.replace( /(<([^>]+)>)/ig, '')}</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ShowHeader;