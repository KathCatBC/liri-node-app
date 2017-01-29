var Twitter = require('twitter');

var apiKeys = require('./keys.js');
 
// var client = new Twitter({
//   consumer_key: 'Dj2pCu29j1c5cknWuUvblNcvj',
//   consumer_secret: '6RqLwMIMKbe1KOjyeSrlcaGFCNKt1EWzRGaHRoiAtSM1g5acyi',
//   access_token_key: '2886195197-0iS8KAiX8YbMoYQxFgacdUk8mI8kH0fKdAaL8MK',
//   access_token_secret: 'VO0SlaxwghEi4xObgQjIzn8TCm8LMCjbcJQhMUBXIVI20',
// });


			var client = new Twitter({
  			

  				// this got consumer_key is not defined

  				// consumer_key: apiKeys.twitterKeys[consumer_key],
  				// consumer_secret: apiKeys.twitterKeys[consumer_secret],
  				// access_token_key: apiKeys.twitterKeys[access_token_key],
  				// access_token_secret: apiKeys.twitterKeys[access_token_secret]


  				// consumer_key: apiKeys.twitterKeys.consumer_key,
  				// consumer_secret: apiKeys.twitterKeys.consumer_secret,
  				// access_token_key: apiKeys.twitterKeys.access_token_key,
  				// access_token_secret: apiKeys.twitterKeys.access_token_secret


  				consumer_key: apiKeys.twitterKeys.consumer_key,
  				consumer_secret: apiKeys.twitterKeys.consumer_secret,
  				access_token_key: apiKeys.twitterKeys.access_token_key,
  				access_token_secret: apiKeys.twitterKeys.access_token_secret


  			
  				// this gives me no errors but does not load the keys
  				// consumer_key: apiKeys.twitterKeys[0],
  				// consumer_secret: apiKeys.twitterKeys[1],
  				// access_token_key: apiKeys.twitterKeys[2],
  				// access_token_secret: apiKeys.twitterKeys[3]


  				// no errors but no keys
  				// key: apiKeys.twitterKeys[key],
  				// key: apiKeys.twitterKeys[key],
  				// key: apiKeys.twitterKeys[key],
  				// key: apiKeys.twitterKeys[key]
		
			});





console.log("client");
console.log(JSON.stringify(client, null, 3));
 console.log("end of client")
 console.log(" ******************************  ")


var params = {screen_name: 'KathCat07'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});