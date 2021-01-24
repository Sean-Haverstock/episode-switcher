import React, { useState, useContext } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { EpisodeContext } from './context/EpisodeContext';

function Replace() {
  const [episodes, setEpisodes, seasonNumbers] = useContext(EpisodeContext);
  const [showQuery, setShowQuery] = useState('');
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState(seasonNumbers[0]);
  const [queryError, setQueryError] = useState(false);
  const [errorString, setErrorString] = useState('');
  const [seasonIndex, setSeasonIndex] = useState(0);

  const seasonNumberAndIndexes = seasonNumbers.reduce((acc, number, idx) => {
    acc[number] = idx;
    return acc;
  }, {});

  const fetchEpisode = async (showQuery) => {
    try {
      const { data } = await axios.get(
        `https://api.tvmaze.com/singlesearch/shows?q=${showQuery}&embed=episodes`
      );
      const { id } = data;
      console.log(id, selectedSeason, selectedEpisode);
      const result = await axios.get(
        `http://api.tvmaze.com/shows/${id}/episodebynumber?season=${selectedSeason}&number=${selectedEpisode}`
      );
      const { name, season, airdate, summary, image, number } = result.data;
      const newEpisode = { name, season, airdate, summary, image, number };
      setEpisodes(
        episodes.map((seasons, index) => {
          return index !== selectedSeason - 1
            ? seasons
            : seasons.map((episode) => {
                return episode.number === selectedEpisode
                  ? newEpisode
                  : episode;
              });
        })
      );

      console.log(result);
    } catch (error) {
      console.log('error', error);
      setQueryError(true);
      setErrorString(`There is no show matching ${showQuery}`);
    }
  };

  function handleSeasonChange(e) {
    console.log('index', e.target, 'value', e.target.value);
    setSelectedSeason(Number(e.target.value));
    setSeasonIndex(seasonNumberAndIndexes[Number(e.target.value)]);
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
          value={selectedSeason}
          onChange={handleSeasonChange}
        >
          {seasonNumbers.map((seasonNumber, index) => {
            return (
              <option
                key={uuidv4()}
                value={seasonNumber}
                index={index}
              >{`Season ${seasonNumber}`}</option>
            );
          })}
        </select>
        <select
          value={selectedEpisode}
          class="mx-3 px-3 py-1 text-secondary rounded"
          onChange={handleEpisodeChange}
        >
          {episodes[seasonIndex].map(({ number: episode }) => {
            return (
              <option
                key={uuidv4()}
                value={episode}
              >{`Episode ${episode}`}</option>
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

// let result = _embedded.episodes.filter((currEpisode) => {
//   return currEpisode.season === selectedSeason;
// });
// if (!result.length) {
//   setErrorString(
//     'There is no matching episode for the season, episode and show provided'
//   );
//   setQueryError(true);
// }
