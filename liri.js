require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
//var spotify = new spotify(keys.spotify);

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

}

function song(name){

}

function movie(title){

}

function read(){

}

