const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Users = require("./Users.js");
const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware');
const VideoUserLink = require("./VideoUserLink.js");

const app = express();

/* Secret for JWT Token signing */
const secret = "FillerSecret";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const mongo_url = 'mongodb://localhost/userdb';

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
mongoose.connect(mongo_url, function(err) {
    if (err) {
        throw err;
    }
    else {
        console.log("Connected to ${mongo_url}");
    }
});

/* Allows these headers on all requests */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

/* Register method which saves data into mongodb */
app.post('/api/register', function(req, res) {
    const {username, password} = req.body;

    const user = new Users({username, password});

    user.save(function(err) {
        if (err) {
            console.log("Registration: Internal Error");
            res.status(500).send("Error registering!");
        }
        else {
            console.log("Registration: User registered.");
            res.status(200).send("User registered!");
        }
    });
});

/* Login method that checks password against one in mongodb and issues a JWT Token */
app.post("/api/login", function(req, res) {
    const {username, password} = req.body;

    Users.findOne({username}, function(err, user) {
        if (err) {
            console.log("Login: Internal Error");
            res.status(500).json({
                error: "Internal Error."
            });
        }
        else if (!user) {
            console.log("Login: Incorrect email");
            res.status(401).json({
                error: "Incorrect email and/or password."
            })
        }
        else {
            user.isCorrectPassword(password, function(err, same) {
                if (err) {
                    console.log("Login: Internal Error");
                    res.status(500).json({
                        error: "Internal Error."
                    });
                }
                else if (!same) {
                    console.log("Login: Incorrect password");
                    res.status(401).json({
                        error: "Incorrect email and/or password."
                    })
                }
                else {
                    /* Token Stuff */
                    const payload = {username};

                    const token = jwt.sign(payload, secret, {
                        expiresIn: '24h'
                    });

                    console.log("Login: Success - " + token);

                    res.status(200).json({token});
                }
            })
        }
    });
})

/* Method to check if a token is valid */
app.get("/api/checkToken", authMiddleware, function (req, res) {
    //console.log(req.username);
    res.status(200).send("Token thingie works");
});

/* Test api */
app.get('/api/secret', authMiddleware, function(req, res) {
    console.log("Secret!");
    res.send('Token authentication works');
});

app.post('/api/emotion', authMiddleware, function(req, res) {

    let url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id="
                + req.body.videoID
                + "&regionCode=US&key="
                + "AIzaSyAcZQ3cGxRxLPwEIPGfpr_jfbkoB06kxig";

    fetch(url, {
        method: 'GET',
        headers: {
            "Accept" : "application/json"
        }
    }).then(function(res){
        const VideoUser = new VideoUserLink(req.username, Date(), req.body.videoID, res.body.items.snippet.title, categoryID[res.body.items.snippet.categoryID] ,req.body.emotion);
        return;
    });
});

/* Servers listens on port 8080 */
app.listen(8080);