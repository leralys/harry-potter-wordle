const mongoose = require('mongoose');
const Character = require('../models/characterModel');
const url = require('./url');
const seedData = require('./characters.json');

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const seedDB = async () => {
  await Character.deleteMany({});
  for (let i = 0; i < seedData.length; i++) {
    let altNames = [];
    let altActors = [];
    seedData[i].alternate_names.forEach((name) => {
      altNames.push(name);
    });
    seedData[i].alternate_actors.forEach((actor) => {
      altActors.push(actor);
    });
    const ch = new Character({
      name: seedData[i].name,
      alternate_names: altNames,
      species: seedData[i].species,
      gender: seedData[i].gender,
      house: seedData[i].house,
      dateOfBirth: seedData[i].dateOfBirth,
      yearOfBirth: seedData[i].yearOfBirth,
      wizard: seedData[i].wizard,
      ancestry: seedData[i].ancestry,
      eyeColour: seedData[i].eyeColour,
      hairColour: seedData[i].hairColour,
      wand: {
        wood: seedData[i].wand.wood,
        core: seedData[i].wand.core,
        length: seedData[i].wand.length,
      },
      patronus: seedData[i].patronus,
      hogwartsStudent: seedData[i].hogwartsStudent,
      hogwartsStaff: seedData[i].hogwartsStaff,
      index: i,
    });
    await ch.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
