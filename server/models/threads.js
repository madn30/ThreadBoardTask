const mongoose = require("mongoose")

const ThreadsSchema = mongoose.Schema({
    threads: [{
        color: String,
        namethread: String,
        comments: [{
            parentId: String,
            colorcomment: String,
            namecomment: String,
            subcomments: [String],
        }]
    }]
})

var threads = mongoose.model('threads', ThreadsSchema);

module.exports = threads