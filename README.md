# Episode Switcher 2021

[Click here](https://episode-switcher2021.herokuapp.com/) to view Sean Haverstock's episode switcher

## Define requirements

#### 1) Load a random TV show on each refresh.

Approach: I decided to hit the **show/:id/embed=episodes** endpoint because **show/:id/episodes** endpoint doesn't return required show info such as summary, genres and premier date. I created a helper function that randomly generated a number between 0 and 50,000. The value/id was returned and interpolated in the useEffect hook. 

#### 2) Dislay ALL episodes starting with first season

Approach: I went with an array of array's to structure the episode list/content into seasons, making each season a subarray. This way I could render the season and episode sibling components with nested map methods. This would later prove to make indexing seasons difficult for shows such as Golfing World whose seasons are not in exact incremental order i.e., seasons go from 1 to 6. 

An alternative approach considered was a single show object that contained all the necessary show information, and each season as a property where each value was an array of episodes. If I were to start over, I would likely restructure my data in this manner, as well as have an additional seasons property with an array to contain the number of each season. 
```javascript
const show = {
    name: 'Simpsons",
    season1: [{}, {}, ..., {}],
    season2: [{}, {}, ..., {}],
    season3: [{}, {}, ..., {}],
    seasons: [1, 6, 7, 8]
    }
```

#### 3) Replace an episode of the same number with the name from input field

Approach: I hit the show single search endpoint returning the embedded episodes. I then had to filter the data to see if the returned data had a season that matched the user selected season. If it didn't I handled the error. 

Alternative: It would have been nicer to hit the Episode by number endpoint **/shows/:id/episodebynumber?season=:season&number=:number** and handle the absence of an episode (error) without the need to filter the data. But without the show id this would require an (additonal) api call beforehand to obtain the id first. 

#### 4) Handle missing images and null data.

Approach: I conditionally rendered much of the data such as images, airdates, summaries and premier dates which were often absent with the use of ternary operators.
For missing images, I created div's the same size as the images that are provided from the api. 


