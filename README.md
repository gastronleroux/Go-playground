## Go playground

Simple web app with a goban (go board) free to mess with or play an offline game of Go
Created mainly with Javascript and some PHP.
The app assumes that the user is already familiar with Go and its rules and nuances.
To learn more about Go, [visit here](https://en.wikipedia.org/wiki/Go_(game)). To learn to play Go, [visit here](https://online-go.com/learn-to-play-go).

## Installation and Setup Instructions

If you're only willing to play around with the goban:
1. Clone the repository.
2. Open 'index.html' in your browser

If you'd like to try the review feature:
1. Clone the repository.
2. Setup a server, for example using Xampp's apache service and locating the project in htdocs directory.
3. Open localhost on whichever port you choosed for the server in your browser.

## Features

You're free to play around with the goban, including simulating an actual game.  
![play](https://github.com/gastronleroux/Go-playground/blob/master/appusage/1.gif)

You can also download or upload sgf files and freely explore the game. When passing the game twice, the app will try to count the score. The score proposition can be modified by clicking on groups the user believes are marked wrong.  
![upload and score](https://github.com/gastronleroux/Go-playground/blob/master/appusage/2.gif)

The review feature let's you interactively dive into a set of 210 games played by professionals. If the board situation matches one of the games in the set, the positions of the next moves are displayed on the board. Hovering over a given move shows the probability of winning.  
![play](https://github.com/gastronleroux/Go-playground/blob/master/appusage/3.gif)
