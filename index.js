// mongoDB login
// master-admin
// QDs6Uy1s2E8XGtWz

// require the express package
const express = require('express');

// import mongoose
const mongoose = require('mongoose');

// init express package
const app = express();

// make use of a middleware to pass req object so we can extract data
app.use(express.json());

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
