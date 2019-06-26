# Vid-Emotion
## Overview
This project is a fully-fledged web-app. Once users are logged into the site, they can watch YouTube videos using video IDs. As the video goes on, pictures are taken with the user's device camera every 30 seconds and stored locally on the user's device. With the pictures and their thoughts on the video, they can submit a rating of their feelings toward the video. All the ratings submitted by the user are stored in a database. Users can then navigate to an analytics website where they can see their average rating for video categories and all the ratings they have submitted. The goal of this project is to help users better pinpoint what category of videos they enjoy.

## Technical Features
* ReactJS used for the front-end
* NodeJS & ExpressJS are used for the back-end
* MongoDB & Mongoose handle the databases and schemas
* Authentication system using MongoDB to store hashed and salted passwords, and JSON Tokens (JWT) stored in user's local storage for verification when accessing protected routes.
* HTTP requests to interact with backend and third party APIs
* React-router usage to have multiple sites in the app and to route users accordingly depending on the link
* Custom middle-ware to help ensure authentication when accessing certain API features

## Set Up
Dependencies needed: 
```
"bcrypt": "^3.0.6",
"bootstrap": "^4.3.1",
"cookie-parser": "^1.4.4",
"express": "^4.17.1",
"jsonwebtoken": "^8.5.1",
"node-fetch": "^2.6.0",
"react": "^16.8.6",
"react-bootstrap": "^1.0.0-beta.8",
"react-dom": "^16.8.6",
"react-router-dom": "^5.0.0",
"react-scripts": "3.0.1",
"react-webcam": "^1.1.1",
"react-youtube": "^7.9.0"
"mongoose": "^5.6.1"
 ```
All of these are available to be downloaded through NPM
 
### Server
To start the back-end portion, navigate into the folder `server-src` with terminal

Run the command `node server.js`

The back-end has now been started

### Website
To run the front-end/React portion, navigate into the `Vid-Emotion` folder where the folder `src` sits, with terminal

Run the command `npm start`

Go to `localhost:3000` in your browser, preferably Chrome, and you should see the front-end

