const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const Users = require("./Users.js");
const VideoUserLink = require("./VideoUserLink.js");

const authMiddleware = require('./authMiddleware');

const app = express();

/* Secret for JWT Token signing. Basic secret, can/should be changed to something more 'cryptic' */
const secret = "FillerSecret";

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

/* URL for mongo db */
const mongo_url = 'mongodb://localhost/userdb';

/* Categories and their IDs. Can also be done using YouTube apis but network request slowdown */
let categoryID = [];
categoryID[1] = "Film & Animation";
categoryID[2] = "Autos & Vehicles";
categoryID[10] = "Music";
categoryID[15] = "Pets & Animals";
categoryID[17] = "Sports";
categoryID[18] = "Short Movies";
categoryID[19] = "Travel & Events";
categoryID[19] = "Travel & Events";
categoryID[20] = "Gaming";
categoryID[21] = "Videoblogging";
categoryID[22] = "People & Blogs";
categoryID[23] = "Comedy";
categoryID[24] = "Entertainment";
categoryID[25] = "News & Politics";
categoryID[26] = "Howto & Style";
categoryID[27] = "Education";
categoryID[28] = "Science & Technology";
categoryID[29] = "Nonprofits & Activism";
categoryID[30] = "Movies";
categoryID[31] = "Anime/Animation";
categoryID[32] = "Action/Adventure";
categoryID[33] = "Classics";
categoryID[34] = "Comedy";
categoryID[35] = "Documentary";
categoryID[36] = "Drama";
categoryID[37] = "Family";
categoryID[38] = "Foreign";
categoryID[39] = "Horror";
categoryID[40] = "Sci-Fi/Fantasy";
categoryID[41] = "Thriller";
categoryID[42] = "Shorts";
categoryID[43] = "Shows";
categoryID[44] = "Trailers";


/* Connects to mongodb */
mongoose.connect(mongo_url, { useNewUrlParser: true }, function(err) {
    if (err) {
        throw err;
    }
    else {
        console.log("Connected to " + mongo_url);
    }
});

/* Allows these headers on all requests */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

/* API to change password for a user */
app.post('/api/changePassword', authMiddleware, async function(req, res) {
    const {oldPassword, newPassword} = req.body;

    let username = req.username;

    /* Finds record for corresponding user */
    Users.findOne({username}, function(err, user) {
        if (err) {
            console.log("Change: Internal Error");
            res.status(500).json({
                error: "Internal Error."
            });
        }
        else if (!user) {
            console.log("Change: Incorrect Username");
            res.status(401).json({
                error: "Incorrect Username and/or password."
            })
        }
        else {

            /* Checks if oldPassword is the correct password */
            user.isCorrectPassword(oldPassword, function(err, same) {

                if (err) {
                    console.log("Change: Internal Error");
                    res.status(500).json({
                        error: "Internal Error."
                    });
                }
                else if (!same) {
                    console.log("Change: Incorrect password for " + username);
                    res.status(401).json({
                        error: "Incorrect email and/or password."
                    })
                }
                else {

                    /* Deleting user from table then in callback adding with new password */
                    Users.deleteOne({ _id: user._id }, function() {
                        const UpdatedUser = new Users({username: username, password: newPassword});

                        /* Saving new password into DB */
                        UpdatedUser.save(function(err) {
                            if (err) {
                                console.log(err);
                                console.log("Change: Error Changing Password!");
                                res.status(500).send("Error Changing Password!");
                            }
                            else {
                                console.log("Change: Saved new password for " + username);
                                res.status(200).send("Saved new Password!");
                            }
                        });

                        res.status(200);
                    });
                }
            })
        }
    });
});

/* Register method which saves data into mongodb */
app.post('/api/register', function(req, res) {
    const {username, password} = req.body;

    const user = new Users({username, password});

    /* Saving user and password into db */
    user.save(function(err) {
        if (err) {
            console.log("Registration: Internal Error");
            res.status(500).send("Error registering!");
        }
        else {
            console.log("Registration: " + username + " registered.");
            res.status(200).send("User registered!");
        }
    });
});

/* Login method that checks password against one in mongodb and issues a JWT Token */
app.post("/api/login", function(req, res) {
    const {username, password} = req.body;

    /* Finds record in db for username */
    Users.findOne({username}, function(err, user) {
        if (err) {
            console.log("Login: Internal Error");
            res.status(500).json({
                error: "Internal Error."
            });
        }
        else if (!user) {
            console.log("Login: Incorrect Username");
            res.status(401).json({
                error: "Incorrect Username and/or password."
            })
        }
        else {

            /* Checks if password the stored password in the db */
            user.isCorrectPassword(password, function(err, same) {
                if (err) {
                    console.log("Login: Internal Error");
                    res.status(500).json({
                        error: "Internal Error."
                    });
                }
                else if (!same) {
                    console.log("Login: Incorrect password for " + username);
                    res.status(401).json({
                        error: "Incorrect Username and/or password."
                    })
                }
                else {

                    const payload = {username};

                    /* Creation of token*/
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '24h'
                    });

                    console.log("Login: Success - " + username);

                    res.status(200).json({token});
                }
            })
        }
    });
});

/* Method to check if a token is valid */
app.get("/api/checkToken", authMiddleware, function (req, res) {
    res.status(200).send("Token validated");
});

/* API to save emotion data in to db */
app.post('/api/emotion', authMiddleware, async function(req, res) {

    const fetch = require('node-fetch');

    const YouTubeAPIKey = ""; //API Key Disabled

    let url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id="
                + req.body.videoID
                + "&regionCode=US&key="
                + YouTubeAPIKey;

    /* Fetch to get information about YouTube video */
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            "Accept" : "application/json"
        }
    });

    let data = await response.json();

    /* Gets various data from the YouTube api response*/
    const VideoUser = new VideoUserLink(
        {
            username: req.username.toString(),
            time: Date(),
            videoID: req.body.videoID,
            videoName: data.items[0].snippet.title,
            topic: categoryID[data.items[0].snippet.categoryId],
            rating: req.body.emotion
        }
    );

    /* Saving to db */
    VideoUser.save();

    res.send('Submitted');

    return;

});

/* API to get average of all categories for a user from db */
app.get('/api/emotion/summary', authMiddleware, async  function(req, res) {
    let query = VideoUserLink.aggregate([
                                    { $match: { username: req.username} },
                                    { $group: { _id: "$topic",
                                                avg: { $avg: "$rating" }
                                              }
                                    }
    ], function(err, result) {
        console.log(result);
        res.send(result);
    });
});

/* API to get all data entered for a user from db */
app.get('/api/emotion/history', authMiddleware, async  function(req, res) {
    let query = VideoUserLink.aggregate([
        { $match: { username: req.username} }
    ], function(err, result) {
        res.send(result);
    });
});

/* Servers listens on port 8080 */
app.listen(8080);