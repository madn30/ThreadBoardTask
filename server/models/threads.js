const mongoose = require("mongoose")

const ThreadsSchema = mongoose.Schema({
    color: String,
    namethread: String,
    comments: [{
        parentId: String,
        colorcomment: String,
        namecomment: String,
        firstcomments: [{
            colorcomment: String,
            namecomment: String,
        }],
    }]
})

var threads = mongoose.model('threads', ThreadsSchema);

module.exports = threads