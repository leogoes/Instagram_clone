const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    images: String,
    likes: {
        type: Number,
        default: 0,
    }
},{
    timestamps: true, //Second parameter of mongoose.Schema
});

module.exports = mongoose.model('Post', PostSchema);