import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import axios from 'axios';

function Replace({episodes}) {
  const [showName, setShow] = useState('')
  const [episode, setEpisode] = useState(1)
  const [season, setSeason] = useState(1)
 
  const fetchEpisode = async (showName) => {
    let { data } = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${showName}&embed=episodes`)
    let { _embedded } = data;
    console.log(_embedded)

    let result = _embedded.episodes.filter(currEpisode => {
      console.log(currEpisode.season, season, currEpisode.number, episode)
      return (currEpisode.season === season && currEpisode.number === episode)
    })
    console.log(result)
  }

  function handleSeasonChange(e) {
    console.log('handleChange', e.target, e.target.value)
    setSeason(e.target.value)
  }
  // function handleSeasonChange(e) {
  //   setSeason()
  // }
  function handleNameChange(e) {
    console.log(e.target.value)
    setShow(e.target.value)
  }
  function handleEpisodeChange(e) {
    console.log(e.target.value)
    setEpisode(Number(e.target.value))
  }
  function handleSubmit(e) {
    e.preventDefault();
    fetchEpisode(showName);
    setShow('');
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
          {episodes[season-1].map(({name, number: episode}) => {
           return (
            <option key={name} value={episode}>{`Episode ${episode}`}</option>
           )
          })}
        </select>
        
        <input value={showName} onChange={handleNameChange}></input>
        <button>Replace</button>
        </form>
    </Container>
  )
}

export default Replace;
