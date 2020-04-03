require("dotenv").config();

var fs = require("fs");
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var argument = process.argv[3];

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

function concert(band){

    axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp")
    .then(function(response){
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
        nextEvent.location = response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country;

        var newDate = moment(response.data[0].datetime);
        
        nextEvent.date = newDate.format("MM/DD/YYYY") + " at " + newDate.format("h:mm A");
        
        nextEvent.printInfo();


    })
    .catch(function(err){
        console.log(err.message)
    });
}

function song(name){
    spotify
        .search({type: 'track', query: name, limit: 1})
        .then(function(response){
            console.log("\nArtist: " + response.tracks.items[0].artists[0].name);
            console.log("Song: " + name);
            console.log("Album: " + response.tracks.items[0].album.name +"\n");
            console.log("Spotify Link: " + response.tracks.items[0].external_urls.spotify);
        })
        .catch(function(err){
            console.log(err);
        })
}

function movie(title){

    axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=222c6746&" + title)
    .then(function(response){})
    .catch(function(err){})
    
}

function read(){
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

