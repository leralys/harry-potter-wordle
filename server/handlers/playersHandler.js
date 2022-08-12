const playerModel = require('../models/playerModel');

const addNewPlayer = (userData) => {
  return playerModel.create({
    ...userData,
    isGame: false,
    gamesPlayed: 0,
    averageAmountTries: 0,
    bestResult: 0,
  });
};

const findPlayerByUserName = (userName) => {
  return playerModel.find().where('userName').equals(userName);
};

const getOnePlayerById = (id) => {
  return playerModel.findById(id).select('-password').exec();
};

const updatePlayer = (id, data) => {
  return playerModel
    .findByIdAndUpdate(id, data, {
      new: true,
    })
    .select('-password');
};

const resetGame = (id) => {
  const update = { isGame: false, characterToGuess: {}, attempts: [] };
  return playerModel.findOneAndUpdate(id, update, {
    new: true,
  });
};

const getThisGameCharacter = (id) => {
  const res = playerModel
    .find()
    .where('_id')
    .equals(id)
    .select('characterToGuess');
  return res;
};

module.exports = {
  addNewPlayer,
  findPlayerByUserName,
  getOnePlayerById,
  updatePlayer,
  getThisGameCharacter,
  resetGame,
};
