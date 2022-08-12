const express = require('express');
const controller = require('../controllers/gameController');

const gameRouter = express.Router();

gameRouter.get('/new/:id', controller.requestStartNewGame);
gameRouter.post('/:id', controller.requestIsGuessedCorrectly);

module.exports = gameRouter;
