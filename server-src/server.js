const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Users = require("./Users.js")

const app = express();

app.post('/api/register', function(req, res) {
    const {username, password} = req.body;

    const Users = new Users({username, password});

    Users.save(function(err) {
        if (err) {
            res.status(500).send("Error registering!");
        }
        else {
            res.status(200).send("User registered!");
        }
    });
});
