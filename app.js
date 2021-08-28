const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const { createUser, login, signout } = require('./controllers/users');
const { NotFoundError } = require('./utils/errors');
const { signinVal, signupVal } = require('./routes/validation');

const { PORT = 3000, MDB } = process.env;

const app = express();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MDB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.post('/signin', signinVal, login);
app.post('/signup', signupVal, createUser);

app.use(auth);

app.post('/signout', signout);

const Router = require('./routes/index');

app.use('/', Router);
app.use(() => {
  throw new NotFoundError('Такого ресурса нет');
});

app.use(errorLogger);

app.use(errors());

const errorHandler = require('./middlewares/errorHandler');

app.use(errorHandler);

app.listen(PORT);
