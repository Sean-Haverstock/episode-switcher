import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import './App.css';
import ShowHeader from './ShowHeader';
import SeasonsAndEpisodes from './SeasonsAndEpisodes';
import Replace from './Replace';
import Navbar from './Navbar.jsx';
import { v4 as uuidv4 } from 'uuid';
import { ShowContext } from './context/ShowContext';
import { EpisodeContext } from './context/EpisodeContext';

function App() {
  const [show, setShow] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShow = async () => {
      console.log('making api call');
      try {
        let response = await axios.get(
          `https://api.tvmaze.com/shows/${generateId(50000)}?embed=episodes`
        );

        let {
          id,
          name,
          genres,
          premiered,
          summary,
          image,
          _embedded,
        } = response.data;

        const obj = { id, name, genres, premiered, summary, image };
        const seasons = _embedded.episodes.reduce(
          (acc, { name, season, airdate, summary, image, number }) => {
            if (acc[season - 1] === undefined) acc[season - 1] = [];
            acc[season - 1].push({
              name,
              season,
              airdate,
              summary,
              image,
              number,
            });
            return acc;
          },
          []
        );
        const filteredSeasons = seasons.filter((el) => {
          return el !== null;
        });
        setEpisodes(filteredSeasons);
        setShow(obj);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShow();
  }, []);

  const generateId = (totalShows) => {
    let random = Math.random() * totalShows;
    return Math.floor(random);
  };

  return (
    <div>
      <ShowContext.Provider value={[show, setShow]}>
        <EpisodeContext.Provider value={[episodes, setEpisodes]}>
          {isLoading ? (
            <>
              <Navbar />
              <div> </div>
            </>
          ) : (
            <>
              <Navbar setLoading={setLoading} />
              <ShowHeader />
              {!episodes.length ? null : <Replace />}
              <SeasonsAndEpisodes key={uuidv4()} />
            </>
          )}
        </EpisodeContext.Provider>
      </ShowContext.Provider>
    </div>
  );
}

export default App;
