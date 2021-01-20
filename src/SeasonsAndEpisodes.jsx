import React from 'react';
import Season from './Season';
import Episode from './Episode';
import { v4 as uuidv4 } from 'uuid';

function SeasonsAndEpisodes({ episodes, show }) {
  return (
    <div>
      {!episodes.length
        ? null
        : episodes.map((season) => {
            return (
              <>
                <Season
                  key={uuidv4()}
                  numberOfEpisodes={season.length}
                  seasonNumber={season[0].season}
                  airdate={season[0].airdate}
                />
                {season.map(
                  ({ airdate, name, season, summary, image, number }) => {
                    return (
                      <Episode
                        key={uuidv4()}
                        name={name}
                        season={season}
                        summary={summary}
                        image={image}
                        episodeNumber={number}
                        airdate={airdate}
                      />
                    );
                  }
                )}
              </>
            );
          })}
    </div>
  );
}

export default SeasonsAndEpisodes;
