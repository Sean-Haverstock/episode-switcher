import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import ShowHeader from './ShowHeader'
import Season from './Season';
import Episode from './Episode';
import Replace from './Replace';

function App() {
  const [show, setShow] = useState({});
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    (async() => {
      try {
        let response = await axios.get(
          "http://api.tvmaze.com/shows/2?embed=episodes"
        );
        // i need to get show state and episode state
        console.log(response);
        let { name, genres, premiered, summary, image, _embedded } = response.data
        // summary = summary.replace( /(<([^>]+)>)/ig, '');
        
        let obj = { name, genres, premiered, summary, image, _embedded }
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
      <ShowHeader info={show} />
      <Replace episodes={episodes} /> 
      {episodes.map((season, i) => {
        return ( 
          <Season 
            key={season[0].airdate}
            numberOfEpisodes={season.length}
            seasonNumber={season[0].season}
            airdate={season[0].airdate}
            >
              {season.map(el => {
                <div>test</div>
              })}
           
          </Season>
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