const characterModel = require('../models/characterModel');
const generateRandomIndex = require('../helpers/randomIndex');

const getAllCharactersNames = () => {
  return characterModel.find().select('_id name');
};

const getRandomCharacter = async () => {
  const numCharacters = await characterModel.countDocuments(
    {},
    function (err, count) {
      return count;
    }
  );
  const indx = generateRandomIndex(numCharacters);
  return characterModel.find().where('index').equals(indx);
};

const getOneCharacterById = (id) => {
  return characterModel.findById(id).exec();
};

const getCharacterToGuess = async () => {
  const numCharacters = await characterModel.countDocuments(
    {},
    function (err, count) {
      return count;
    }
  );
  const indx = generateRandomIndex(numCharacters);
  return await characterModel
    .find()
    .where('index')
    .equals(indx)
    .select('name wizard hogwartsStudent hogwartsStaff species gender');
};

const findPlayerAttemp = (characterId, characterName) => {
  return characterModel
    .find(
      { name: characterName, _id: characterId },
      'name species gender wizard hogwartsStudent hogwartsStaff'
    )
    .exec();
};

module.exports = {
  getAllCharactersNames,
  getRandomCharacter,
  getOneCharacterById,
  getCharacterToGuess,
  findPlayerAttemp,
};
