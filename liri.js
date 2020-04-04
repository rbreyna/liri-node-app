//require files and npms for app functionality
require("dotenv").config();

var fs = require("fs");
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//grab user input and store as variables to pass to switch statement
var action = process.argv[2];
var argument = process.argv.slice(3).join(" ");

//run the appropriate case based from the user's requested action
switch(action){
    case "concert-this":
        concert(argument);
        break;
    case "spotify-this-song":
        song(argument);
        break;
    case "movie-this":
        movie(argument);
        break;
    case "do-what-it-says":
        read();
        break;
}

//function for concert info
function concert(band){

    //send request to Bands in Town API using axios
    axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp")
    .then(function(response){

        //create an object to store info of next concert
        var nextEvent =
            {
                venue: "",
                location: "",
                date: "",
                printInfo: function(){
                    console.log("\n"+band +"'s next event info:\n");
                    console.log("Venue: " + this.venue);
                    console.log("Location: " + this.location);
                    console.log("Date & Time: " + this.date);
                }
            };

        nextEvent.venue = response.data[0].venue.name;
        
        //Verify info is stored in the city, region, and country properties of returned object from API call.
        if(response.data[0].venue.city != ""){
            nextEvent.location = response.data[0].venue.city + ", "
        }

        if(response.data[0].venue.region != ""){
            nextEvent.location += response.data[0].venue.region + ", "
        }
        
        if(response.data[0].venue.country != ""){
            nextEvent.location += response.data[0].venue.country;
        }

        //Grab date and format it to MM/DD/YYYY format using moment
        var newDate = moment(response.data[0].datetime);
        
        nextEvent.date = newDate.format("MM/DD/YYYY") + " at " + newDate.format("h:mm A");
        
        //Print event info in a user friendly output
        nextEvent.printInfo();


    })
    .catch(function(err){
        console.log(err.message)
    });
}

//function to run Spotify call for song info
function song(name){

    //request to Spotify API using the npm called node-spotify-api 
    spotify
        .search({type: 'track', query: name, limit: 1})
        .then(function(response){
            //Appropriate Song Info is displayed terminal
            console.log("\nArtist: " + response.tracks.items[0].artists[0].name);
            console.log("Song: " + name);
            console.log("Album: " + response.tracks.items[0].album.name +"\n");
            console.log("Spotify Link: " + response.tracks.items[0].external_urls.spotify +"\n");
        })
        .catch(function(err){
            console.log(err);
        })
}

//function to make API call using axios to OMDB API to gather movie info
function movie(title){

    axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=222c6746&t=" + title)
    .then(function(response){
        //Movie Properties are displayed in terminal
        console.log("\nMovie Info for: " + title +"\n");
        console.log("Title: " + response.data.Title);
        console.log("Year Released: "  +response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value); 
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors + "\n");   
    })
    .catch(function(err){
        console.log(err.message)
    })
    
}

function read(){
    //"random.txt" file is read to perform an action instead of grabbing user input
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }
        var array = data.split(",");

        action = array[0];
        argument = array[1];

        song(argument);
    });
}

