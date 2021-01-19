import React from 'react'
import Season from './Season'
import Episode from './Episode'

function SeasonsAndEpisodes({episodes}) {
  return (
    <div>
      {episodes.map((season, i) => {
        return (
          <>
          <Season 
            key={season[i].airdate}
            numberOfEpisodes={season.length}
            seasonNumber={season[i].season}
            airdate={season[i].airdate}
            />
            
              {season.map(({airdate, name, season, summary, image, number}) => {
              return (
                <Episode 
                  key={name + airdate}
                  name={name}
                  season={season}
                  summary={summary}
                  image={image}
                  episodeNumber={number}
                  airdate={airdate}
                  />
                )
            })}
            </>
          )
      })} 
    </div>
  )
}

export default SeasonsAndEpisodes;
