const express = require('express');
const controller = require('../controllers/playersController');

const playersRouter = express.Router();

playersRouter.post('/register', controller.requestCreateNewPlayer);
playersRouter.post('/login', controller.requestLogin);

module.exports = playersRouter;
