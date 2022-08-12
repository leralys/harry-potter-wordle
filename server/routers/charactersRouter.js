const express = require('express');
const controller = require('../controllers/charactersController');

const charactersRouter = express.Router();

charactersRouter.get('/names', controller.requestAllCharactersNames);
charactersRouter.get('/random', controller.requestRandomCharacter);
charactersRouter.get('/:id', controller.requestOneCharacterById);

module.exports = charactersRouter;
