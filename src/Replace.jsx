import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

function Replace({ episodes, setEpisodes }) {
	console.log('episodeState', episodes);
	const [showQuery, setShowQuery] = useState('');
	const [selectedEpisode, setSelectedEpisode] = useState(1);
	const [selectedSeason, setSelectedSeason] = useState(1);

	const fetchEpisode = async (showQuery) => {
		try {
			let { data } = await axios.get(
				`https://api.tvmaze.com/singlesearch/shows?q=${showQuery}&embed=episodes`
			);
			let { _embedded } = data;
			console.log('apiCall result', _embedded);

			let result = _embedded.episodes.filter((currEpisode) => {
				console.log(
					currEpisode.season,
					'=',
					selectedSeason,
					'?',
					currEpisode.season === selectedSeason
				);
				return currEpisode.season === selectedSeason;
			});
			console.log('result', result);
			setEpisodes(
				episodes.map((seasons, index) => {
					return index !== selectedSeason - 1
						? seasons
						: seasons.map((episodeObj) => {
								console.log(episodeObj.number, selectedEpisode);
								return episodeObj.number === selectedEpisode
									? result[selectedEpisode - 1]
									: episodeObj;
						  });
				})
			);
		} catch (error) {
			console.log(error);
		}
	};

	function handleSeasonChange(e) {
		console.log('handleChange', e.target, e.target.value);
		setSelectedSeason(Number(e.target.value));
	}
	// function handleSeasonChange(e) {
	//   setSeason()
	// }
	function handleNameChange(e) {
		console.log(e.target.value);
		setShowQuery(e.target.value);
	}
	function handleEpisodeChange(e) {
		console.log(e.target.value);
		setSelectedEpisode(Number(e.target.value));
	}
	function handleSubmit(e) {
		e.preventDefault();
		fetchEpisode(showQuery);
		setShowQuery('');
		setSelectedEpisode(1);
		setSelectedSeason(1);
	}

	return (
		<div class="container">
			<form onSubmit={handleSubmit}>
				<label for="season">Replace</label>
				<select
					class="mx-3 px-3 py-1 text-secondary rounded"
					id="season"
					onChange={handleSeasonChange}
				>
					{episodes.map((season, i) => {
						return (
							<option
								key={season[i].season}
								value={season[i].season}
							>{`Season ${season[i].season}`}</option>
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
				<label class="mx-3" for="showName">
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
		</div>
	);
}

export default Replace;
