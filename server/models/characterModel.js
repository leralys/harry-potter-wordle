const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must have a name'],
    unique: true,
  },
  alternate_names: [String],
  species: {
    type: String,
    required: [true, 'must have a species name'],
  },
  gender: {
    type: String,
    required: [true, 'must have a gender'],
  },
  house: String,
  dateOfBirth: String,
  yearOfBirth: String,
  wizard: {
    type: Boolean,
    required: [true, 'required value'],
  },
  ancestry: String,
  eyeColour: String,
  hairColour: String,
  wand: {
    wood: String,
    core: String,
    length: Number,
  },
  patronus: String,
  hogwartsStudent: {
    type: Boolean,
    required: [true, 'required value'],
  },
  hogwartsStaff: {
    type: Boolean,
    required: [true, 'required value'],
  },
  actor: String,
  alternate_actors: [String],
  alive: Boolean,
  image: String,
  index: {
    type: Number,
    required: [true, 'must have an index'],
    unique: true,
  },
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
