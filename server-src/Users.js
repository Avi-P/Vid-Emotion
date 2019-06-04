const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/* Number of salt rounds for when we hash the password */
const saltRounds = 10;

/* User schema for login information */
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

/* Function to save into mongodb which hashes password before saving */
UserSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password')) {
        const document = this;

        /* Calls method to hash password */
        bcrypt.hash(this.password, saltRounds,
            function(err, hashedPassword) {
                if(err) {
                    next(err);
                }
                else {
                    document.password = hashedPassword;
                    next();
                }
            })
    }
    else {
        next();
    }
});

/* Method to check if the password user entered in is same as the one in the db */
UserSchema.methods.isCorrectPassword = function(password, callback) {

    /* Calls method to check password against hashed one */
    bcrypt.compare(password, this.password, function(err, same) {
        if (err) {
            callback(err);
        }
        else {
            callback(err, same);
        }
    });
};

module.exports = mongoose.model("Users", UserSchema);
