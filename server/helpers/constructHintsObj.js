const constructHintsObj = (correct, attempt) => {
  const { index, _id, ...params } = correct;
  const hintsObj = {};
  Object.entries(params).forEach((keyVal) => {
    let [key, value] = keyVal;
    // if strings not the same - hint is falsy
    if (typeof value !== 'boolean') {
      hintsObj[key] = value === attempt[key] ? true : false;
      // unless both of the booleans are true the hint is falsy
    } else {
      hintsObj[key] = value === true && attempt[key] === true ? true : false;
    }
  });
  hintsObj.attemptedName = attempt.name;
  return hintsObj;
};

module.exports = constructHintsObj;

// const correct = {
//   _id: '62b1d1ff72c9884dc46ec151',
//   name: 'Barnabas Deverill',
//   species: 'human',
//   gender: 'male',
//   wizard: true,
//   hogwartsStudent: false,
//   hogwartsStaff: false,
// };

// const attempt = {
//   _id: '62b1d1ae72c9884dc46ebe8d',
//   name: 'Harry Potter',
//   species: 'human',
//   gender: 'male',
//   wizard: true,
//   hogwartsStudent: true,
//   hogwartsStaff: false,
// };

// console.log(constructHintsObj(correct, attempt));
