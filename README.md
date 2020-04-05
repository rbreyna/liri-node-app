# liri-node-app

### What is the liri-node-app doing??
The liri-app that I've created is meant to give the user appropriate song, movie, or concert info based on the user's selection. Setting up this app will help save the user time reseaching the desired info. Instead of reading through multiple websites, this app provides a "One Stop Shop" for the user.

### How is the liri-node-app put together?
The user input is grabbed and analyzed so that the appropriate actions can be performed. The user will provide one of 4 possible actions. A switch statment was used in the app construction and four different functions were created to handle each of four different possible user inputs. In one function, a file will be read to grab the necessary arguments to run the app. Within the other three functions, an API request will be made (based from the user's selection). A response object will be returned and with this object, I've pulled specfic properties to display info back to the user in the terminal.

### How does the app run?
The user will run the app in the terminal using one of the four types of prompts.

1. `node liri.js concert-this <artist/band name here>`
2. `node liri.js spotify-this-song '<song name here>'`
3. `node liri.js movie-this '<movie name here>'`
4. `node liri.js do-what-it-says`

The app will take the user commands and perform the appropriate tasks. Here is what each command will do.

1. The app will take the artist/band and will return the event info of their next concert from the Bands In Town API. The name of the venue, the venue location, date (formated MM/DD/YYYY), time (formated: h:mm a) will be returned to the terminal. The returned info will be neatly displayed for easy readability.

2. The app will take the song name and return the artist info from the Spotify API. The Artist/Band Name, the song's name, a Spotify preview link, and the Album that the song is from will be neatly displayed in the terminal. If no song is provided with this command, the default song is "The Sign" by Ace of Base.

3. The app will take the movie title and it to the OMDB API. The follow movie info properties will be taken from the API and displayed to the terminal.
     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

4. When this command is ran, my app will read a file titled "random.txt" to grab arguments that will run one of the other 3 functions.

### Screenshots of Liri App
[image](./images/concert-this.png)
[image](./images/spotify-this-song.png)
[image](./images/movie-this.png)
[image](./images/do-what-it-says.png)

### Link to Deployed Version
[file](./liri.js)

### Technologies Used

#### 1. API's
* Spotify
* Bands In Town
* IMDB

#### 2. npm's
* Axios
* Spotify-node-api
* fs
* moment

### Role in App Development
I was the only one involved with building this app. I designed and coded the entire thing.
