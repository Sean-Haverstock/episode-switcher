import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import './App.css';
import ShowHeader from './ShowHeader';
import SeasonsAndEpisodes from './SeasonsAndEpisodes';
import Replace from './Replace';
import Navbar from './Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
	const [show, setShow] = useState({});
	const [episodes, setEpisodes] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const fetchShow = async () => {
			console.log('making api call');
			try {
				let response = await axios.get(
					`http://api.tvmaze.com/shows/${generateId(50000)}?embed=episodes`
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
			{isLoading ? (
				<>
					<Navbar setEpisodes={setEpisodes} setShow={setShow} />
					<div> </div>
				</>
			) : (
				<>
					<Navbar
						setEpisodes={setEpisodes}
						setShow={setShow}
						loading={isLoading}
						setLoading={setLoading}
					/>
					<ShowHeader info={show} />
					{!episodes.length ? null : (
						<Replace
							episodes={episodes}
							setEpisodes={setEpisodes}
							show={show}
						/>
					)}
					<SeasonsAndEpisodes
						key={uuidv4()}
						episodes={episodes}
						setEpisodes={setEpisodes}
						show={show}
						setShow={setShow}
					/>
				</>
			)}
		</div>
	);
}

export default App;
