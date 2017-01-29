var fs = require('fs');
var req = require('request');

var doThis = process.argv[2];
var withThis = process.argv[3];

if (doThis == "do-what-it-says") {
	fs.readFile('random.txt', 'utf8', function(err, data) {
	var randomArr = data.split(',');
	doThis = randomArr[0];
	withThis = randomArr[1];	        
    });
    doOutput();
} else {
	doOutput();
}


function doOutput() {
	switch(doThis) {
	    case "my-tweets":

	    	var Twitter = require("twitter");
	    	var apiKeys = require("./keys.js")
	    	
			var client = new Twitter({
  				consumer_key: apiKeys.twitterKeys.consumer_key,
  				consumer_secret: apiKeys.twitterKeys.consumer_secret,
  				access_token_key: apiKeys.twitterKeys.access_token_key,
  				access_token_secret: apiKeys.twitterKeys.access_token_secret
			});

			var params = {screen_name: 'KathCat07', count: 20};
			client.get('statuses/user_timeline', params, function(error, tweets, response) {
  				
  				if (!error) {
  					console.log("# of tweets = " + tweets.length);
  					console.log("**************************************");
   					for (i=0; i<=tweets.length-1; i++) {
   						console.log("on " + tweets[0].created_at);
   						console.log("I tweeted:  " + tweets[0].text);
   						console.log("**************************************");
   					} 
   				} else {
   					 console.log("oops... there was an error"); 
  				} 
			});
	    	
	        break;

	    case "spotify-this-song":
	    	console.log("music");
	    	if (withThis == undefined) {
	    		withThis = "The Sign" // by Ace of Base
	    	}
			// Artist(s)
			// The song's name
			// A preview link of the song from Spotify
			// The album that the song is from
			// if no song is provided then your program will default to
			// curl -X GET "https://api.spotify.com/v1/search?q=%22The+Sign%22&type=track" -H "Accept: application/json"
	        break;

	    case "movie-this":
	    	console.log("movie");
	    	if (withThis == undefined) {
	    		withThis =  'Mr Nobody'
	    	}

			var queryUrl = "http://www.omdbapi.com/?t=" + withThis + "&y=&plot=short&tomatoes=true&r=json";

			req(queryUrl, function (er, res, body) {

				if (er !== null) {
					console.log("oops... there was an error"); 
				} else if (JSON.parse(body).Response == "False"){
					console.log("Error - " + withThis + " was not found!")
				} else {
				    console.log("Title:  " + JSON.parse(body).Title);
				    console.log("Year:  " + JSON.parse(body).Year);
				    console.log("IMDB Rating:  " + JSON.parse(body).imdbRating);
				    console.log("Country:  " + JSON.parse(body).Country);
				    console.log("Language:  " + JSON.parse(body).Language);
				    console.log("Plot:  " + JSON.parse(body).Plot);
				    console.log("Actors:  " + JSON.parse(body).Actors);
				    console.log("Rotten Tomatoes Rating:  " + JSON.parse(body).tomatoMeter);
				    console.log("Rotten Tomatoes URL:  " + JSON.parse(body).tomatoURL);
				}

			});

	    	break;

	    default:
	    	console.log("Sorry, that command is not recognized");
	}

	fs.appendFile('log.txt', '{' + process.argv[2] + ":" + process.argv[3] + "}, ");
}
