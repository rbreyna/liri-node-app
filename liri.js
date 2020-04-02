require("dotenv").config();

var fs = require("fs");
var axios = require("axios");
var keys = require("./keys.js");
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
    request("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp", function (error, response, body) {

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

