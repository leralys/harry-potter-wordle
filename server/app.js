const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const router = require('./routers/index').router;

dotenv.config();
// environmental variables
const PORT = process.env.SERVER_PORT || 5000;
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
const SECRET = process.env.SECRET;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session
app.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// db
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected successfully'))
  .catch((err) => {
    console.log('ERROR', err);
  });

app.use('/api', router);
// if you hit the route that doesn't exist
app.all('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
