import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ShowHeader from './ShowHeader'
import Season from './Season';
import Episode from './Episode';
import Replace from './Replace';
import Navbar from './Navbar';

function App() {
  // const EpisodeContext = createContext();
  const [show, setShow] = useState({});
  const [episodes, setEpisodes] = useState([]);
  
  useEffect(() => {
    
    (async() => {
      console.log('making api call')
      try {
        let response = await axios.get(
          "http://api.tvmaze.com/shows/1?embed=episodes"
        );
        // i need to get show state and episode state
        console.log(response);
        let { name, genres, premiered, summary, image, _embedded } = response.data
        
        let obj = { name, genres, premiered, summary, image: image.medium }
        console.log('showwwww', obj)
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
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line
  }, []);
  
  return (
    <div className="App">
      {/* <EpisodeContext.Provider value={episodes, setEpisodes} > */}
      <Navbar setEpisodes={setEpisodes} setShow={setShow} />
      <ShowHeader info={show} />
      <Replace episodes={episodes} setEpisodes={setEpisodes} /> 
      {episodes.map((season, i) => {
        return (
          <>
          <Season 
            key={season[i].airdate}
            numberOfEpisodes={season.length}
            seasonNumber={season[i].season}
            airdate={season[i].airdate}
            />
            
              {season.map(({airdate, name, season, summary, image, number}) => {
              return (
                <Episode 
                  key={name + airdate}
                  name={name}
                  season={season}
                  summary={summary}
                  image={image}
                  episodeNumber={number}
                  airdate={airdate}
                  />
                )
            })}
            </>
           )
  })} 
  
    </div>
  );
}

export default App;


 {/* {season.map(({airdate, name, season, summary, image, episode}) => {
              return (
                <Episode 
                  key={airdate}
                  name={name}
                  season={season}
                  summary={summary}
                  image={image.medium ? image.medium : null}
                  episodeNumber={episode}
                  airdate={airdate}
                  />
                )
            })} */}