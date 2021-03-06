import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ShowHeader from './components/ShowHeader';
import SeasonsAndEpisodes from './components/SeasonsAndEpisodes';
import Replace from './components/Replace';
import Navbar from './components/Navbar.jsx';
import { ShowContext } from './context/ShowContext';
import { EpisodeContext } from './context/EpisodeContext';

function App() {
  const [show, setShow] = useState({});
  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const { data } = await axios.get(
          `https://api.tvmaze.com/shows/${generateId(
            50000
          )}?embed[]=seasons&embed[]=episodes`
        );

        const { id, name, genres, premiered, summary, image, _embedded } = data;
        const seasonNumbers = _embedded.seasons.map(({ number }) => number);

        const showDetails = { id, name, genres, premiered, summary, image };
        const episodesBySeason = _embedded.episodes.reduce(
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
        const filteredSeasons = episodesBySeason.filter((el) => {
          return el !== null;
        });
        setEpisodes(filteredSeasons);
        setSeasons(seasonNumbers);
        setShow(showDetails);
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
        <EpisodeContext.Provider
          value={[episodes, setEpisodes, seasons, setSeasons]}
        >
          {isLoading ? (
            <>
              <Navbar setLoading={setLoading} />
              <div> </div>
            </>
          ) : (
            <>
              <Navbar setLoading={setLoading} />
              <ShowHeader />
              {!episodes.length ? null : <Replace />}
              <SeasonsAndEpisodes />
            </>
          )}
        </EpisodeContext.Provider>
      </ShowContext.Provider>
    </div>
  );
}

export default App;
