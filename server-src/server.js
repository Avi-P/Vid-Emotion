const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Users = require("./Users.js")

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongo_url = 'mongodb://localhost/userdb'

mongoose.connect(mongo_url, function(err) {
    if (err) {
        throw err;
    }
    else {
        console.log("Connected to ${mongo_url}");
    }
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/api/register', function(req, res) {
    const {username, password} = req.body;

    const user = new Users({username, password});

    user.save(function(err) {
        if (err) {
            console.log(err);
            res.status(500).send("Error registering!");
        }
        else {
            console.log("Users registered!");
            res.status(200).send("User registered!");
        }
    });
});

app.post("/api/login", function(req, res) {
    const {username, password} = req.body;

    Users.findOne({username}, function(err, user) {
        if (err) {
            //console.log("Incorrect!")
            res.status(500).json({
                error: "Internal Error."
            });
        }
        else if (!user) {
            //console.log("Incorrect!")
            res.status(401).json({
                error: "Incorrect email and/or password."
            })
        }
        else {
            user.isCorrectPassword(password, function(err, same) {
                if (err) {
                    console.log("Incorrect!")
                    res.status(500).json({
                        error: "Internal Error."
                    });
                }
                else if (!same) {
                    console.log("Incorrect!")
                    res.status(401).json({
                        error: "Incorrect email and/or password."
                    })
                }
                else {
                    /* Token Stuff */
                    console.log("Login!");
                    res.status(200).send("Looks like a match!");


                }
            })
        }
    });
})

app.listen(8080);