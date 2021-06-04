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
    const { namethread, color, childrens } = req.body;
    const newThread = new Threads({ threads: [{ namethread, color, childrens }] })
    try {
        await newThread.save();
        res.status(201).json(newThread);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateComment = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const thread = await Threads.findOne({ "threads._id": id })
    thread.threads[0].comments.push(req.body)
    thread.save()
    res.json(thread);
}

module.exports = { router, getThreads, createThread, updateComment, getThread }