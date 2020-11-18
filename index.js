// mongoDB login
// master-admin
// QDs6Uy1s2E8XGtWz

// require the express package
const express = require('express');

// import mongoose
const mongoose = require('mongoose');

// import the houses route file, now we can use this as a middleware
const houses = require('./routes/houses');

// init express package
const app = express();

// make use of a middleware to pass req object so we can extract data
app.use(express.json());

// add home route using app.get('/')
app.get('/', (req, res) => {
	res.send('Welcome to the house-listing-API');
});

// when the user makes any request to the /api/houses  it will passed to the houses route
app.use('/api/houses', houses);

// load env variable in the index.js
require('dotenv').config();

// we can have access to the env variable
// if theres not port in the .env it will be passed 3000
const port = process.env.PORT || 3000;

mongoose
	.connect(
		'mongodb+srv://master-admin:QDs6Uy1s2E8XGtWz@cluster0.c6occ.mongodb.net/home-listing-database?retryWrites=true&w=majority',
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then((result) => {
		// make request on port from env var
		app.listen(port, () => console.log(`Server is running on port ${port}.`));
	})
	.catch((err) => console.log(err));
