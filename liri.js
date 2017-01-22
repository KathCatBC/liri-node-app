var fs = require('fs');

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
	    	// get 20 latest tweets
	        break;
	    case "spotify-this-song":
	    	console.log("music");
	    	// if (withThis = "") {
	    	// 	withThis =  // "The Sign" by Ace of Base
	    	// }
			// Artist(s)
			// The song's name
			// A preview link of the song from Spotify
			// The album that the song is from
			// if no song is provided then your program will default to
	        break;
	    case "movie-this":
	    	console.log("movie");
	    	// if (withThis = "") {
	    	// 	withThis =  'Mr. Nobody.'
	    	// }}
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



