const bcrypt = require('bcrypt');
const handler = require('../handlers/playersHandler');

const requestCreateNewPlayer = async (req, res) => {
  const saltRounds = 10;
  const { userName } = req.body;
  const password = await bcrypt.hash(req.body.password, saltRounds);
  try {
    const result = await handler.addNewPlayer({ userName, password });
    res.status(200).json({
      status: 'success',
      data: { userName, playerId: result._id },
    });
  } catch (err) {
    res.status(409).json({
      status: 'fail',
      message: 'The username already exists',
    });
  }
};

const requestLogin = async (req, res) => {
  const { userName } = req.body;
  try {
    const result = await handler.findPlayerByUserName(userName);
    const player = result[0];
    const passHash = player.password;
    const match = await bcrypt.compare(req.body.password, passHash);
    if (match) {
      // send to a client status of his game and statistics without password
      const { _doc } = player;
      let { password, ...gamePlayerInfo } = _doc;
      res.status(200).json({
        status: 'success',
        data: gamePlayerInfo,
      });
    } else {
      res.status(401).json({
        status: 'fail',
        message: 'password is incorrect',
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
  requestCreateNewPlayer,
  requestLogin,
};
