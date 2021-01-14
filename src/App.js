import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import SeasonHeader from './ShowHeader';

function App() {
  const [show, setShow] = useState({});
  // const [episodes, setEpisodes] = useState(null);
  useEffect(() => {
    async function getShow() {
      try {
        let response = await axios.get(
          "http://api.tvmaze.com/shows/1?embed=episodes"
        );
        // i need to get show state and episode state
        console.log('response', response);
        let { name, genres, premiered, summary, image, _embedded } = response.data
       
        let seasons = _embedded.episodes.reduce((acc, {name, season, episode, airdate, summary, image}) => {
          if (acc[season - 1] === undefined) acc[season - 1] = [];
          acc[season - 1].push({
            name, 
            season,
            episode,
            airdate,
            summary,
            image
          });
          return acc;
        }, [])
        const filteredSeasons = seasons.filter(el => {
          return el !== null
        })
        
        setShow({...show, name, genres, premiered, summary, image})
        // setEpisodes(filteredSeasons)
      } catch (error) {
        console.log(error);
      }
    }
    getShow();
  }, []);
  console.log(show)
  return (
    <div className="App">
      <SeasonHeader show={show} />
      
    </div>
  );
}

export default App;

