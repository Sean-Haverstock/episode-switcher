import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Navbar({setEpisodes, setShow}) {
  const [showQuery, setShowQuery] = useState('')

  const fetchShow = async (showQuery) => {
    try {
    let { data } = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${showQuery}&embed=episodes`)
    let { name, genres, premiered, summary, image, _embedded } = data
    
    let obj = { name, genres, premiered, summary, image: image.medium }
    console.log('in navbar showwwww', obj, 'episdoes', _embedded)
    let seasons = _embedded.episodes.reduce((acc, {name, season, airdate, summary, image, number }) => {
      if (acc[season - 1] === undefined) acc[season - 1] = [];
      acc[season - 1].push({
        name, 
        season,
        airdate,
        summary,
        image, 
        number
      });
      return acc;
    }, [])
    const filteredSeasons = seasons.filter(el => {
      return el !== null
    })
    setShow(obj)
    setEpisodes(filteredSeasons)
    } catch(error) {
      console.log(error)
    }
  }

  function handleClick(e) {
    e.preventDefault(e)
    fetchShow(showQuery)

  }
  function handleChange(e) {
    setShowQuery(e.target.value)
  }

  return (
    <div style={{backgroundColor: 'gray'}}>
      <Container>
        <Row>
          <Col>
          <h6 style={{color: 'white'}}>Episode Switcher</h6>
          </Col>
          <input placeholder='Enter a TV Show' value={showQuery} onChange={handleChange} />
          <button onClick={handleClick}>Search</button>
          <Col/>
        </Row>
      </Container>
    </div>
  )
}

export default Navbar;
