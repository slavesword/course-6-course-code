// mongodb+srv://slaven:slaven@openclassp6.g1s24ns.mongodb.net/?retryWrites=true&w=majority&appName=OpenClassP6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const stuffRoutes = require("./routes/stuff");
const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json());
app.use(express.json());

mongoose.connect('mongodb+srv://slaven:slaven@openclassp6.g1s24ns.mongodb.net/?retryWrites=true&w=majority&appName=OpenClassP6')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;