import React from 'react';
import ShowHeaderStyles from './ShowHeaderStyles.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

function ShowHeader({ info }) {
	console.log('showheader', info);
	let { genres, image, name, premiered, summary } = info;

	return (
		<div class="container">
			<div class="row">
				<div class="col-xs-3">
					{image ? (
						<img src={image.medium} alt="poster" />
					) : (
						<div class="image-null">N/A</div>
					)}
				</div>
				<div class="col">
					<h2>{name}</h2>
					<p class="text-muted">
						{premiered
							? `${genres.join(', ')} | Premiered on ${dayjs(premiered).format(
									'll'
							  )}`
							: `${genres.join(', ')}`}
					</p>
					<p>
						{!summary
							? ''
							: summary.length > 700
							? `${summary.slice(0, 700).replace(/(<([^>]+)>)/gi, '')}...`
							: `${summary.replace(/(<([^>]+)>)/gi, '')}`}
					</p>
				</div>
			</div>
		</div>
	);
}

export default ShowHeader;
