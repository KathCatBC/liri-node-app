var fs = require('fs');
var req = require('request');

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

			fs.appendFile('log.txt', '{' + process.argv[2] + ":" + process.argv[3] + "}, generated the following results:\r\n");

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
   					outputData += "+++++++++++++++++++++++++++++++++++++++++\r\n";
   					console.log(outputData);
   					fs.appendFile("log.txt", outputData)
   				} else {
   					 console.log("oops... there was an error");
   					 fs.appendFile("oops... there was an error\r\n"); 
   					 fs.appendFile('log.txt', "+++++++++++++++++++++++++++++++++++++++++\r\n");
  				}
  				
			});
	    	
	        break;

	    case "spotify-this-song":
	  
	    	if (withThis == undefined) {
	    		withThis = "The Sign by Ace of Base"
	    	}

			var spotify = require('spotify');

			fs.appendFile('log.txt', '{' + process.argv[2] + ":" + process.argv[3] + "}, generated the following results: \r\n");
 
  			spotify.search({ type: 'track', query: withThis }, function(err, data) {
    			if ( err ) {
        			console.log('Error occurred: ' + err);
        			fs.appendFile('log.txt', 'Error occurred: ' + err + "\r\n");
        			fs.appendFile('log.txt', "+++++++++++++++++++++++++++++++++++++++++\r\n");
    			} else {
	    			var outputData = {
						song:  data.tracks.items[0].name,
		 				preview: data.tracks.items[0].preview_url,
		 				album: data.tracks.items[0].album.name,
		 				artists: data.tracks.items[0].artists[0].name
     				}

     				console.log(JSON.stringify(outputData, null, 2));
     				fs.appendFile('log.txt', outputData + "\r\n");
     				fs.appendFile('log.txt', "+++++++++++++++++++++++++++++++++++++++++\r\n");
    			};
  			});

  			

	        break;

	    case "movie-this":
	    	
	    	if (withThis == undefined) {
	    		withThis =  'Mr Nobody'
	    	}

	    	fs.appendFile('log.txt', '{' + process.argv[2] + ":" + process.argv[3] + "}, generated the following results:\r\n");
			
			var queryUrl = "http://www.omdbapi.com/?t=" + withThis + "&y=&plot=short&tomatoes=true&r=json";
			req(queryUrl, function (er, res, body) {

				if (er !== null) {
					console.log("oops... there was an error"); 
					fs.appendFile('log.txt', "oops... there was an error\r\n"); 
					fs.appendFile('log.txt', "+++++++++++++++++++++++++++++++++++++++++\r\n");
				} else if (JSON.parse(body).Response == "False"){
					console.log("Error - " + withThis + " was not found!")
					fs.appendFile('log.txt', "Error - " + withThis + " was not found!\r\n")
					fs.appendFile('log.txt', "+++++++++++++++++++++++++++++++++++++++++\r\n");
				} else {
					var outputData = {
					    Title: JSON.parse(body).Title,
					    Year:  JSON.parse(body).Year,
					    "IMDB Rating": JSON.parse(body).imdbRating,
					    Country: JSON.parse(body).Country,
					    Language: JSON.parse(body).Language,
					    Plot: JSON.parse(body).Plot,
					    Actors: JSON.parse(body).Actors,
					    "Rotten Tomatoes Rating": JSON.parse(body).tomatoMeter,
					    "Rotten Tomatoes URL":  JSON.parse(body).tomatoURL
					}
					console.log(JSON.stringify(outputData, null, 2));
					fs.appendFile('log.txt', outputData + "\r\n");
					fs.appendFile('log.txt', "+++++++++++++++++++++++++++++++++++++++++\r\n");
				}

			});

	    	break;

	    default:
	    	console.log("Sorry, that command is not recognized");
	    	fs.appendFile('log.txt', "Sorry, that command is not recognized\r\n");
	    	fs.appendFile('log.txt', "+++++++++++++++++++++++++++++++++++++++++\r\n");
	}
}
