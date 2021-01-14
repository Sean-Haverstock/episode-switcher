import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import SeasonHeader from './SeasonHeader';

function App() {
  const [show, setShow] = useState({});
  const [episodes, setEpisodes] = useState(null);
  useEffect(() => {
    async function getShow() {
      try {
        let response = await axios.get(
          "http://api.tvmaze.com/shows/9360?embed=episodes"
        );
        // i need to get show state and episode state
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
        setEpisodes(filteredSeasons)
      } catch (error) {
        console.log(error);
      }
    }
    getShow();
  }, []);

  return (
    <div className="App">
      <SeasonHeader show={show} episodes={episodes} />
    </div>
  );
}

export default App;

