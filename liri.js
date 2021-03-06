var fs = require('fs');
var req = require('request');
var errOutput = "Error";  // this will change based on the error string generated by the API call
var outputBreak = "+++++++++++++++++++++++++++++++++++++++++\r\n";

var doThis = process.argv[2];
var withThis = process.argv[3];

if (doThis == "do-what-it-says") {
	fs.readFile('random.txt', 'utf8', function(err, data) {

		var randomArr = data.split(',');

		doThis = randomArr[0];
		withThis = randomArr[1];	        
	   
	    doOutput();
     });

} else {
	doOutput();
}


function doOutput() {

	fs.appendFile('log.txt', '{' + process.argv[2] + ":" + process.argv[3] + "}, generated the following results:\r\n");

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
  					var outputData = "";
  					outputData += "# of tweets = " + tweets.length + "\r\n"
  					outputData += "**************************************\r\n";
   					for (i=0; i<=tweets.length-1; i++) {
   						outputData += "on " + tweets[i].created_at +"\r\n";
   						outputData += "I tweeted:  " + tweets[i].text +"\r\n";
   						outputData +=  "**************************************\r\n"
   					} 
   					console.log(outputData);
   					fs.appendFile("log.txt", outputData + outputBreak)
   				} else {
   					 console.log("oops... there was an error");
   					 fs.appendFile("log.txt", "oops... there was an error\r\n" + ouputBreak); 
  				}
  				
			});
	    	
	        break;

	    case "spotify-this-song":
	  
	    	if (withThis == undefined) {
	    		withThis = "The Sign by Ace of Base"
	    	}

			var spotify = require('spotify');

  			spotify.search({ type: 'track', query: withThis }, function(err, data) {
    			if ( err ) {
        			console.log('Error occurred: ' + err);
        			fs.appendFile('log.txt', 'Error occurred: ' + err + "\r\n" + outputBreak);
    			} else {
	    			var outputData = "song:  " + data.tracks.items[0].name + "\r\n";
		 			outputData += "preview URL: " + data.tracks.items[0].preview_url + "\r\n";
		 			outputData += "album:  " + data.tracks.items[0].album.name + "\r\n";
		 			outputData += "artists:  " + data.tracks.items[0].artists[0].name + "\r\n";
     				console.log(outputData);
     				fs.appendFile('log.txt', outputData  + outputBreak);
    			};
  			});

	        break;

	    case "movie-this":
	    	
	    	if (withThis == undefined) {
	    		withThis =  'Mr Nobody'
	    	}
			
			var queryUrl = "http://www.omdbapi.com/?t=" + withThis + "&y=&plot=short&tomatoes=true&r=json";
			req(queryUrl, function (er, res, body) {

				if (er !== null) {
					errOutput = "oops... there was an error"
 					console.log(errOutput) 
					fs.appendFile("log.txt", errOutput + "\r\n" + ouputBreak); 
				} else if (JSON.parse(body).Response == "False"){
					errOutput = "Error - " + withThis + " was not found!"
					console.log(errOutput);
					fs.appendFile("log.txt", errOutput + "\r\n" + ouputBreak);
				} else {
					var outputData = "Title: " + JSON.parse(body).Title + "\r\n";
					outputData += "Year:  " + JSON.parse(body).Year + "\r\n";
					outputData += "IMDB Rating:  " + JSON.parse(body).imdbRating + "\r\n";
					outputData += "Country: " + JSON.parse(body).Country  + "\r\n";
					outputData += "Language:  " + JSON.parse(body).Language  + "\r\n";
					outputData += "Plot:  " + JSON.parse(body).Plot  + "\r\n";
					outputData += "Actors:  "+ JSON.parse(body).Actors  + "\r\n";
					outputData += "Rotten Tomatoes Rating:  "  + JSON.parse(body).tomatoMeter  + "\r\n";
					outputData += "Rotten Tomatoes URL:  "  +  JSON.parse(body).tomatoURL  + "\r\n";
			
	  				console.log(outputData);
					fs.appendFile('log.txt', outputData + outputBreak);
				}

			});

	    	break;

	    default:
	    	
	    	errOutput = "Sorry, that command is not recognized"
	    	console.log(errOutput);
	    	fs.appendFile('log.txt', errOutput + "\r\n" + outputBreak);
	}
}
