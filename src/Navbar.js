import React, { useState } from 'react';
import axios from 'axios';

function Navbar({ setEpisodes, setShow, setLoading }) {
	const [showQuery, setShowQuery] = useState('');

	const fetchShow = async (showQuery) => {
		setLoading(true);
		try {
			let { data } = await axios.get(
				`https://api.tvmaze.com/singlesearch/shows?q=${showQuery}&embed=episodes`
			);
			let { name, genres, premiered, summary, image, _embedded } = data;
			const obj = { name, genres, premiered, summary, image };

			let seasons = _embedded.episodes.reduce(
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

			setShow(obj);
			setEpisodes(filteredSeasons);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	function handleSubmit(e) {
		e.preventDefault();
		fetchShow(showQuery);
		setShowQuery('');
	}
	function handleChange(e) {
		setShowQuery(e.target.value);
	}

	return (
		<div class="bg-dark">
			<div class="container">
				<div class="row justifty-content-between align-items-center">
					<h4 class="col align-self-center text-white">Episode Switcher</h4>
					<div class="col align-self-center">
						<form style={{ float: 'right' }} onSubmit={handleSubmit}>
							<input
								class="rounded"
								placeholder="Enter a TV Show"
								value={showQuery}
								onChange={handleChange}
							/>
							<button
								class="bg-secondary text-white rounded"
								onClick={handleSubmit}
							>
								Search
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
