import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'

function Replace({episodes}) {
  console.log('episodes', episodes)
  const [seasonIndex, setSeasonIndex] = useState(0)
  const [showName, setShow] = useState('')
  const [episode, setEpisode] = useState(episodes[0][0].number)
  const [season, setSeason] = useState(episodes[0][0].season)

  function handleIndexChange(e) {
    console.log('handleChange', e.target, e.target.value)
    setSeasonIndex(e.target.value)
  }
  // function handleSeasonChange(e) {
  //   setSeason()
  // }
  function handleNameChange(e) {
    console.log(e.target.select)
    setShow(e.target.value)
  }
  function handleEpisodeChange(e) {
    console.log(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target)
    setShow('');
  }
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <select onChange={handleIndexChange}>
        {episodes.map((season, i) => {
          return (
            <option key={season[i].season} index={i} value={season[i].season}>{`Season ${season[i].season}`}</option>
          )
        })}
        </select>
        <select onChange={handleEpisodeChange}>
          {episodes[seasonIndex].map(({name, number}) => {
           return (
            <option key={name} value={number}>{`Episode ${number}`}</option>
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
