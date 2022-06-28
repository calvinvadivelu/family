const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const postNode = require('../node/post');
const getNode = require('../node/get');

router.get('', getNode);

router.post('', postNode)

module.exports = router;