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
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createThread = async (req, res) => {
    const { namethread, color } = req.body;
    const newThread = new Threads({ namethread, color })
    try {
        await newThread.save();
        res.status(201).json(newThread);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const addComment = async (req, res) => {
    const { id } = req.params
    var thread
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    if (req.body.which === "threadcomment") {
        thread = await Threads.findOne({ _id: id })
        thread.comments.push(req.body)


    }
    else if (req.body.which === "firstcomment") {
        thread = await Threads.findOne({ "comments._id": id })
        thread.comments.map(e => e._id == id && e.firstcomments.push(req.body))
    }
    thread.save()
    res.json(thread);
}

const updateComment = async (req, res) => {
    const { id } = req.params
    const { index, name } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    try {
        const thread = await Threads.findOne({ _id: id })
        thread.comments[index].namecomment = name
        thread.save()
        res.json(thread);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }

}

module.exports = { router, getThreads, createThread, addComment, getThread, updateComment }