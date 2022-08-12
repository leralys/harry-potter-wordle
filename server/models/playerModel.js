const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  name: Boolean,
  wizard: Boolean,
  hogwartsStudent: Boolean,
  hogwartsStaff: Boolean,
  species: Boolean,
  gender: Boolean,
  attemptedName: String,
});

const playerSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'must have a userName'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'must have a userName'],
  },
  isGame: {
    type: Boolean,
    required: [true, 'required value'],
  },
  characterToGuess: {
    name: String,
    _id: String,
    index: Number,
    wizard: Boolean,
    hogwartsStudent: Boolean,
    hogwartsStaff: Boolean,
    species: String,
    gender: String,
  },
  attempts: [attemptSchema],
  gamesPlayed: Number,
  averageAmountTries: Number,
  bestResult: Number,
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
