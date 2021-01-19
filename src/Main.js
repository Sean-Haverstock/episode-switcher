import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import './App.css';
import ShowHeader from './ShowHeader';
import SeasonsAndEpisodes from './SeasonsAndEpisodes';
import Replace from './Replace';
import Navbar from './Navbar';

function Main() {
	const [show, setShow] = useState({});
	const [episodes, setEpisodes] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const generateId = (totalShows) => {
		let random = Math.random() * totalShows;
		return Math.floor(random);
	};
	const id = generateId(50000);
	console.log(id);
	useEffect(() => {
		const fetchShow = async () => {
			console.log('making api call');
			try {
				let response = await axios.get(
					`http://api.tvmaze.com/shows/${id}?embed=episodes`
				);

				console.log(response);
				let {
					name,
					genres,
					premiered,
					summary,
					image,
					_embedded,
				} = response.data;

				const obj = { name, genres, premiered, summary, image };
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
				setShow(obj);
				setEpisodes(filteredSeasons);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchShow();
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			{isLoading ? (
				<>
					<Navbar setEpisodes={setEpisodes} setShow={setShow} />
					<div> Loading.... </div>
				</>
			) : (
				<>
					<Navbar setEpisodes={setEpisodes} setShow={setShow} />
					<ShowHeader info={show} />
					<Replace episodes={episodes} setEpisodes={setEpisodes} />
					<SeasonsAndEpisodes
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

export default Main;

// const [show, setShow] = useState({
//   id: 1,
//   image: {
//     medium: '',
//     original: '',
//   },
//   name: '',
//   premiered: '',
//   genres: [],
// });
// const [episodes, setEpisodes] = useState([
//   [
//     {
//       id: 1,
//       name: '',
//       season: 1,
//       number: 1,
//       airdate: '',
//       image: {
//         medium: '',
//       },
//       summary: '',
//     },
//   ],
// ]);
