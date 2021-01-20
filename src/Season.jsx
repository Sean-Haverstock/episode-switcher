import React from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

function Season({ numberOfEpisodes, seasonNumber, airDate }) {
  return (
    <div class="container" style={{ borderBottom: '2px solid gray' }}>
      <div class="row">
        <h3>Season {seasonNumber}</h3>
      </div>
      <div class="row">
        <p class="text-muted">{`${numberOfEpisodes} episodes | Aired ${dayjs(
          airDate
        ).format('ll')}`}</p>
      </div>
    </div>
  );
}

export default Season;
