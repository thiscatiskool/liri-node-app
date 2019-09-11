var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var request = require('request');
var Twitter = require('twitter');
var fs = require('fs');
var omdbapi = require('omdbapi')
var axios = require("axios");


var getMyTweets = function () {

    var client = new Twitter(keys.twitterKeys);

    var params = {
        screen_name: 'Winston0704'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        console.log(error)
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(' ');
                console.log(tweets[i].text);
            }
        }
    });
}



var getArtistNames = function (artist) {
    return artist.name;
};

var getMeSpotify = function (songName) {
var spotify = new Spotify(keys.spotifyKeys);
   
  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data)

    var songs = data.tracks.items;
    console.log(data)

    for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
        console.log('song name: ' + songs[i].name);
        console.log('preview song: ' + songs[i].preview_url);
        console.log('album: ' + songs[i].album.name);
        console.log('-----------------------------------------------');

    }
   
  });
};

 /*
var getMeSpotify = function (songName) {
    spotify.search({
            type: 'track',
            query: songName
        },
        function (err, data) {
            if (err) {
                console.nodeg('Error occurred: ' + err);
                return;
            }
            console.log(data)

            var songs = data.tracks.items;
            console.log(data)

            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log('artist(s): ' + songs[i].artist.map(getArtistNames));
                console.log('song name: ' + songs[i].name);
                console.log('preview song: ' + songs[i].preview_url);
                console.log('album: ' + songs[i].album.name);
                console.log('-----------------------------------------------');

            }
        });

};
*/

var getMeMovie = function (movieName) {
    var omdb = new omdbapi(keys.omdbKeys);
    var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json' 
    axios.get(queryUrl).then(function (error, response, body) {
        console.log(omdb).catch(function(error){
        if (!error && response.statusCode == 200) {
            var jsonData = JSON.parse(body);
            console.log(movieName)
            console.log(error)
            console.log(body)

            console.log('Title: ' + jsonData.Title);
            console.log('Year: ' + jsonData.Year);
            console.log('Rated: ' + jsonData.Rated);
            console.log('IMDB Rating: ' + jsonData.imdbRating);
            console.log('Country: ' + jsonData.Country);
            console.log('Language: ' + jsonData.Language);
            console.log('Plot: ' + jsonData.Plot);
            console.log('Actors: ' + jsonData.Actors);
            console.log('Rotten Tomatoes rating: ' + jsonData.tomatoRating);
            console.log('Rotten Tomatoes URL: ' + jsonData.tomatoURL);
        }
    })
    })
};

var doWhatItSays = function () {
    fs.readFile('./random.txt', 'utf8', function (err, data) {
        if (err) throw err;

        var dataArr = data.split(',');
        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            pick(dataArr[0])
        }
    });
}

var pick = function (caseData, functionData) {
    switch (caseData) {
        case 'my-tweets':
            getMyTweets();
            break;
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        case 'movie-this':
            getMeMovie(functionData)
            console.log(functionData)
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log('Liri does not know that')
    }
};

var runThis = function (argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);