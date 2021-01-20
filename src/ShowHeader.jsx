import React from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

function ShowHeader({ info }) {
  let { genres, image, name, premiered, summary } = info;

  return (
    <div class="container">
      <div class="row">
        <div class="col-xs-3 d-flex poster-null">
          {image ? (
            <img src={image.medium} alt="poster" />
          ) : (
            <h3 class="col align-self-center">NA</h3>
          )}
        </div>
        <div class="col">
          <h2>{name}</h2>
          <p class="text-muted">
            {premiered && genres.length
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
