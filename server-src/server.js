const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Users = require("./Users.js");
const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware');

const app = express();

/* Secret for JWT Token signing */
const secret = "FillerSecret";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const mongo_url = 'mongodb://localhost/userdb';

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
    res.status(200).send("Token thingie works");
});

/* Test api */
app.get('/api/secret', authMiddleware, function(req, res) {
    console.log("Secret!");
    res.send('Token authentication works');
});

/* Servers listens on port 8080 */
app.listen(8080);