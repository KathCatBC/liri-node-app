var fs = require('fs');
var apiKeys = require('./keys.js');

var doThis = process.argv[2];
console.log("input " + process.argv[2]);
var withThis = process.argv[3]
console.log("input " + process.argv[3]);

if (doThis == "do-what-it-says") {
	fs.readFile('random.txt', 'utf8', function(err, data) {
	var randomArr = data.split(',');
	doThis = randomArr[0];
	withThis = randomArr[1];
	console.log("do " + doThis + " with " + withThis);	        
    });
    doOutput();
} else {
	doOutput();
}


function doOutput() {
	switch(doThis) {
	    case "my-tweets":
	    	console.log("tweet");
	    	console.log(JSON.stringify(apiKeys.twitterKeys));
	    	// console.log("length = " + keys.twitterKeys.length);
	    	for (var key in apiKeys.twitterKeys ){
	    		console.log(key + "=" + apiKeys.twitterKeys[key]+",");
	    	}

	    	AuthStr = "Authorization: OAuth oauth_consumer_key="+ "'" + apiKeys.twitterKeys[0] +"',"+ "oauth_signature_method='HMAC-SHA1',"

	    	console.log("auth string = " + AuthStr)
	    	// API Call from Twitter console:

				// GET /1.1/statuses/user_timeline.json?count=20&user_id=KathCat07 HTTP/1.1
				// Authorization:
				// OAuth oauth_consumer_key="DC0sePOBbQ8bYdC8r4Smg",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1485111070",oauth_nonce="3178620281",oauth_version="1.0",oauth_token="2886195197-SNkTaPNBmOLCeJhiSUMeaG8FZhguarmjhiQ0rKG",oauth_signature="ERN5o4ufInys3uI96FApyf5ykQg%3D"
				// Host:
				// api.twitter.com
				// X-Target-URI:
				// https://api.twitter.com
				// Connection:
				// Keep-Alive
	        break;
	    case "spotify-this-song":
	    	console.log("music");
	    	if (withThis == "") {
	    		withThis = "The Sign" // by Ace of Base
	    	}
			// Artist(s)
			// The song's name
			// A preview link of the song from Spotify
			// The album that the song is from
			// if no song is provided then your program will default to
			curl -X GET "https://api.spotify.com/v1/search?q=%22The+Sign%22&type=track" -H "Accept: application/json"
	        break;
	    case "movie-this":
	    	console.log("movie");
	    	if (withThis == "") {
	    		withThis =  'Mr. Nobody.'
	    	}
	  		//Title of the movie.
			// Year the movie came out.
			// IMDB Rating of the movie.
			// Country where the movie was produced.
			// Language of the movie.
			// Plot of the movie.
			// Actors in the movie.
			// Rotten Tomatoes Rating.
			// Rotten Tomatoes URL.
	    	break;
	    default:
	    	console.log("Sorry, that command is not recognized");
	}

	fs.appendFile('log.txt', '{' + process.argv[2] + ":" + process.argv[3] + "}, ");
}



