const express = require('express');
const router = express.Router();
const charactersRouter = require('./charactersRouter');
const playersRouter = require('./playersRouter');
const gameRouter = require('./gameRouter');

router.use('/characters', charactersRouter);
router.use('/players', playersRouter);
router.use('/game', gameRouter);
module.exports = { router };
