const express = require('express')

const { getThread, getThreads, createThread, updateComment } = require('../controller/thread')

const router = express.Router();

router.get('/', getThreads);
router.get('/:id', getThread);
router.post('/', createThread);
router.patch('/:id', updateComment);


module.exports = router