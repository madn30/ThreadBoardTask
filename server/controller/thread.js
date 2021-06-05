const express = require('express')
const mongoose = require('mongoose')
const Threads = require('../models/threads')

const router = express.Router();

const getThreads = async (req, res) => {
    try {
        const threads = await Threads.find();
        res.status(200).json(threads);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getThread = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Threads.findOne({ "threads._id": id });
        console.log(post);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createThread = async (req, res) => {
    console.log(req.body);
    const { namethread, color } = req.body;
    const newThread = new Threads({ namethread, color })
    try {
        await newThread.save();
        res.status(201).json(newThread);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateComment = async (req, res) => {
    const { id } = req.params
    var thread
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    // console.log(req.body);
    if (req.body.which === "threadcomment") {
        thread = await Threads.findOne({ _id: id })
        thread.comments.push(req.body)


    }
    else if (req.body.which === "firstcomment") {
        thread = await Threads.findOne({ "comments._id": id })
        console.log(id);
        thread.comments.map(e => e._id == id && e.firstcomments.push(req.body))
    }
    thread.save()
    res.json(thread);
}

module.exports = { router, getThreads, createThread, updateComment, getThread }