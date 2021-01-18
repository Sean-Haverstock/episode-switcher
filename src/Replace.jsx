import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import axios from 'axios';

function Replace({episodes, setEpisodes}) {
  console.log('episodeState', episodes)
  const [showQuery, setShowQuery] = useState('')
  const [selectedEpisode, setSelectedEpisode] = useState(1)
  const [selectedSeason, setSelectedSeason] = useState(1)
  
  const fetchEpisode = async (showQuery) => {
    try {
    let { data } = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${showQuery}&embed=episodes`)
    let { _embedded } = data;
    console.log('apiCall result', _embedded)

    let result = _embedded.episodes.filter(currEpisode => {
      console.log(currEpisode.season, '=', selectedSeason, '?', currEpisode.season === selectedSeason)
      return (currEpisode.season === selectedSeason)
    })
    console.log('result', result)
    setEpisodes(episodes.map((seasons, index) => {
      console.log(selectedSeason)
      return (index !== (selectedSeason - 1)) ? seasons : seasons.map(episodeObj => {
        // console.log(episodeObj)
        return episodeObj.number === selectedEpisode ? result[0] : episodeObj
      })
    }))
  } catch(error) {
    console.log(error)
  }
}

  function handleSeasonChange(e) {
    console.log('handleChange', e.target, e.target.value)
    setSelectedSeason(Number(e.target.value))
  }
  // function handleSeasonChange(e) {
  //   setSeason()
  // }
  function handleNameChange(e) {
    console.log(e.target.value)
    setShowQuery(e.target.value)
  }
  function handleEpisodeChange(e) {
    console.log(e.target.value)
    setSelectedEpisode(Number(e.target.value))
  }
  function handleSubmit(e) {
    e.preventDefault();
    fetchEpisode(showQuery);
    setShowQuery('');
    setSelectedEpisode(1);
    setSelectedSeason(1);
  }
  

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <select onChange={handleSeasonChange}>
        {episodes.map((season, i) => {
          return (
            <option key={season[i].season} value={season[i].season}>{`Season ${season[i].season}`}</option>
          )
        })}
        </select>
        <select onChange={handleEpisodeChange}>
          {episodes[selectedSeason-1].map(({name, number: episode}) => {
           return (
            <option key={name} value={episode}>{`Episode ${episode}`}</option>
           )
          })}
        </select>
        
        <input value={showQuery} onChange={handleNameChange}></input>
        <button>Replace</button>
        </form>
    </Container>
  )
}

export default Replace;
