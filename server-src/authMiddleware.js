const jwt = require("jsonwebtoken");
const secret = "FillerSecret";

/* Middleware that checks if the JWT token is valid before continuing onto rest of the request */
const authMiddleware = function(req, res, next) {
    const token = req.headers['authorization'];
    //console.log(req);
    //console.log("Token: " + token);

    if (!token) {
        res.status(401).send("No Token!");
    }
    else {
        /* Token verification here */
        jwt.verify(token.substring(7), secret, function (err, decoded) {
            if (err) {
                res.status(401).send("Invalid Token!");
            }
            else {
                req.username = decoded.username;
                next();
            }
        })
    }
};

module.exports = authMiddleware;