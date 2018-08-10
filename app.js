const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dataRouter=require('./routes/data');
const memberRouter=require('./routes/members');
const hoursRouter=require('./routes/hours');
const committeeRouter=require('./routes/committee');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/data',dataRouter);
app.use('/members',memberRouter);
app.use('/hours',hoursRouter);
app.use('/committee',committeeRouter);

module.exports = app;
