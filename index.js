//Imports required dependencies.
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const users = require('./routes/users.js');

//Creates an express server.
const app = express();

//Sets conversion middlewares.
app.use(express.json());

//Sets logging middleware.
app.use(morgan('common'));

//Sets cors middleware.
app.use(cors({ exposedHeaders: 'X-Total-Count' }));

//Sets users resource/router middlewares.
app.use('/users', users);

//Sets default 404 middleware.
app.use((_, res) => {
    res.status(404).send('<h2>404 - Resource not found.</h2>');
});

//Starts the server.
app.listen(3000);