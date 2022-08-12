const playersHandler = require('../handlers/playersHandler');
const charactersHandler = require('../handlers/charactersHandler');
const constructHintsObj = require('../helpers/constructHintsObj');

const requestStartNewGame = async (req, res) => {
  const { id } = req.params;
  try {
    // generate random character
    const result = await charactersHandler.getCharacterToGuess();
    const characterToGuess = result[0];
    // update the fields that are related to the game start - characterToGuess, isGame
    const update = await playersHandler.updatePlayer(id, {
      isGame: true,
      characterToGuess,
    });
    // send to the client the word it needs to guess
    res.status(200).json({
      status: 'success',
      data: update,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

const requestIsGuessedCorrectly = async (req, res) => {
  try {
    const playerId = req.params.id;
    const { characterId, characterName } = req.body;
    // find in the db the character the player needs to guess
    const correctAnswer = await playersHandler.getThisGameCharacter(playerId);
    // find in the db the current attempt's character
    const attempt = await charactersHandler.findPlayerAttemp(
      characterId,
      characterName
    );
    // compare id's, if they are the same - the user won
    if (correctAnswer[0].characterToGuess._id === attempt[0]._id.toString()) {
      const result = await playersHandler.resetGame(playerId);
      // send the result
      res.status(200).json({
        status: 'won',
        data: result,
      });
    } else {
      const player = await playersHandler.getOnePlayerById(playerId);
      // make hints object
      const currentHints = constructHintsObj(
        correctAnswer[0].characterToGuess,
        attempt[0]
      );
      // update players attempts
      player.attempts.push(currentHints);
      await player.save();
      // send hints
      res.status(200).json({
        status: 'success',
        data: player,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

module.exports = {
  requestStartNewGame,
  requestIsGuessedCorrectly,
};
