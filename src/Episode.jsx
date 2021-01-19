import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

function Episode({ name, season, summary, image, episodeNumber, airdate }) {
	console.log('summary', summary);
	return (
		<div class="container">
			<div class="row align-items-center">
				<div class="col-xs-3 d-flex image-null">
					{image ? (
						<img src={image.medium} alt="poster" />
					) : (
						<h3 class="col align-self-center">NA</h3>
					)}
				</div>
				<div class="col">
					<h4>{name}</h4>
					<p class="text-muted">
						{airdate
							? `Season ${season} | Episode ${episodeNumber} | ${dayjs(
									airdate
							  ).format('ll')}`
							: `Season ${season} | Episode ${episodeNumber}`}
					</p>
					<p class="text-break">
						{!summary
							? ''
							: summary.length > 270
							? `${summary.slice(0, 270).replace(/(<([^>]+)>)/gi, '')}...`
							: `${summary.replace(/(<([^>]+)>)/gi, '')}`}
					</p>
				</div>
			</div>
		</div>
	);
}

export default Episode;
