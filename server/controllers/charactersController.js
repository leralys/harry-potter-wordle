const handler = require('../handlers/charactersHandler');

const requestAllCharactersNames = async (req, res) => {
  try {
    const result = await handler.getAllCharactersNames();
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

const requestRandomCharacter = async (req, res) => {
  try {
    const result = await handler.getRandomCharacter();
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

const requestOneCharacterById = async (req, res) => {
  try {
    const result = await handler.getOneCharacterById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

module.exports = {
  requestAllCharactersNames,
  requestRandomCharacter,
  requestOneCharacterById,
};
