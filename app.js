const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const users = require('./routes/users.js');

const app = express();

app.use(express.json());
app.use(morgan('common'));
app.use(cors({ exposedHeaders: 'X-Total-Count' }));
app.use('/users', users);

module.exports = app;