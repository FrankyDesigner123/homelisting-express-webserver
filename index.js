// require the express package
const express = require('express');

// init express package
const app = express();

// load env variable in the index.js
require('dotenv').config();

const homes = [
	{
		id: 1,
		type: 'Apartment',
		description: 'some dummy description',
	},
	{
		id: 2,
		type: 'Flat',
		description: 'some dummy edited description',
	},
];

// listen some request (get - post - put - delete)
// .get() function -> 1st parm: route 2nd param: function with request and response
app.get('/', (req, res) => {
	res.send('Welcome to express!'); // send a response to the user
});

// when user make request to /api/listing
// we send an array of objects
app.get('/api/listing', (req, res) => {
	res.send(homes);
});

// :id for dynamic value
app.get('/api/listing/:id', (req, res) => {
	// logic to check if the id exists in the array with homes.find()
	// we make use of parseInt to convert req.params.id to interger
	const home = homes.find((home) => home.id === parseInt(req.params.id)); // req.params.id we can return the id that we pass to the route

	// check if home is false
	if (!home) {
		// send a status 404 with text ...
		res.status(404).send('The home with given id cannot be found.');
	}
	// if home exists we send home
	res.send(home);
});

// we can have access to the env variable
// if theres not port in the .env it will be passed 3000
const port = process.env.PORT || 3000;

// make request on port from env var
app.listen(port, () => console.log(`Server is running on port ${port}.`));
