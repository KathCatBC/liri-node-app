# liri-node-app

# How to use Liri:
 
* make sure the follow NPM packages are installed:
  - request
  - spotify
  - twitter
  
  
* On the command line type:
 - node liri.js my-tweets
  
 - You will get the last 20 tweets I tweeted (as of publication time I did not yet have 20 tweets).
 - You will see on the screen a tweet count and the tweets, as well as when they were tweeted.
 - All of the information will also be appended to log.txt.    
  
  
* On the command line type:
 - node liri.js spotify-this-song "Song Title"
 - Replace "Song Title" with an actual song title.
 - Make sure the song title is in quotes.
  
 - You will see information about this song from Spotify.
 - All of the information will also be appended to log.txt.    


* On the command line type:
 - node liri.js movie-this "Movie Title"
 - Replace "Movie Title" with an actual movie title.
 - Make sure the movie title is in quotes.
  
 - You will see information about this movie from OMDB.
 - All of the information will also be appended to log.txt.    
  
* On the command line type:
 - node liri.js do-what-it-says
  
 - The app will read a file named random.txt and do one of the above API calls based on the contents of the file.
 - All of the information will also be appended to log.txt.    
  
  
