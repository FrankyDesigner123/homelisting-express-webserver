// require the express package
const express = require('express');

// init express package
const app = express();

// load env variable in the index.js
require('dotenv').config();

// listen some request (get - post - put - delete)
// .get() function -> 1st parm: route 2nd param: function with request and response
app.get('/', (req, res) => {
	res.send('Welcome to express!'); // send a response to the user
});

// when user make request to /api/listing
// we send an array of objects
app.get('/api/listing', (req, res) => {
	res.send([
		{ id: 1, roomType: 'Duplex' },
		{ id: 2, roomType: 'Flat' },
		{ id: 3, roomType: 'Villa' },
	]);
});

// we can have access to the env variable
// if theres not port in the .env it will be passed 3000
const port = process.env.PORT || 3000;

// make request on port from env var
app.listen(port, () => console.log(`Server is running on port ${port}.`));
