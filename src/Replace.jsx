import React, { useState, useContext } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ShowContext } from './context/ShowContext';
import { EpisodeContext } from './context/EpisodeContext';

function Replace() {
  const [showQuery, setShowQuery] = useState('');
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [queryError, setQueryError] = useState(false);
  const [errorString, setErrorString] = useState('');

  const [episodes, setEpisodes] = useContext(EpisodeContext);

  const fetchEpisode = async (showQuery) => {
    try {
      let { data } = await axios.get(
        `https://api.tvmaze.com/singlesearch/shows?q=${showQuery}&embed=episodes`
      );

      let { _embedded } = data;

      let result = _embedded.episodes.filter((currEpisode) => {
        return currEpisode.season === selectedSeason;
      });
      if (!result.length) {
        setErrorString(
          'There is no matching episode for the season, episode and show provided'
        );
        setQueryError(true);
      }

      setEpisodes(
        episodes.map((seasons, index) => {
          return index !== selectedSeason - 1
            ? seasons
            : seasons.map((episodeObj) => {
                return episodeObj.number === selectedEpisode
                  ? result[selectedEpisode - 1]
                  : episodeObj;
              });
        })
      );
    } catch (error) {
      setQueryError(true);
      setErrorString(`There is no show matching ${showQuery}`);
    }
  };

  function handleSeasonChange(e) {
    setSelectedSeason(Number(e.target.value));
  }

  function handleNameChange(e) {
    setShowQuery(e.target.value);
  }
  function handleEpisodeChange(e) {
    setSelectedEpisode(Number(e.target.value));
  }
  function handleSubmit(e) {
    setQueryError(false);
    setErrorString('');
    e.preventDefault();
    fetchEpisode(showQuery);
  }

  return (
    <div class="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="season">Replace</label>
        <select
          class="mx-3 px-3 py-1 text-secondary rounded"
          id="season"
          onChange={handleSeasonChange}
        >
          {episodes.map((season) => {
            return (
              <option
                key={uuidv4()}
                value={season[0].season}
              >{`Season ${season[0].season}`}</option>
            );
          })}
        </select>
        <select
          class="mx-3 px-3 py-1 text-secondary rounded"
          onChange={handleEpisodeChange}
        >
          {episodes[selectedSeason - 1].map(({ name, number: episode }) => {
            return (
              <option key={name} value={episode}>{`Episode ${episode}`}</option>
            );
          })}
        </select>
        <label class="mx-3" htmlFor="showName">
          with
        </label>
        <input
          class="mx-3"
          id="showName"
          value={showQuery}
          onChange={handleNameChange}
        ></input>
        <button
          class="mx-3 px-4 py-1 bg-dark text-white rounded"
          onClick={handleSubmit}
        >
          Replace
        </button>
      </form>
      {queryError ? (
        <div class="container px-3 text-white bg-danger rounded-2">{`${errorString}`}</div>
      ) : null}
    </div>
  );
}

export default Replace;
