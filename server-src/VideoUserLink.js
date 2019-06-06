const mongoose = require('mongoose');

const VideoUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
        required: true
    },
    videoID: {
        type: String,
        required: true
    },
    videoName: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("VideoUserLink", VideoUserSchema);