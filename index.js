// require the express package
const express = require('express');

// init express package
const app = express();

// make use of a middleware to pass req object so we can extract data
app.use(express.json());

// load env variable in the index.js
require('dotenv').config();

const homes = [
	{
		id: 1,
		homeType: 'Apartment',
		description: 'some dummy description',
		role: 'admin',
	},
	{
		id: 2,
		homeType: 'Flat',
		description: 'some dummy edited description',
		role: 'user',
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

// post is using to get new resource
app.post('/api/listing', (req, res) => {
	// validation check if type or description is not provided
	if (!req.body.homeType || !req.body.description) {
		// if its not provided we send an error msg using res.send()
		return res.status(400).send('Title and description is required.');
	}

	// create object with the property from homes array.
	const home = {
		id: homes.length + 1, // dynamic id
		homeType: req.body.homeType, // request the data from body
		description: req.body.description,
		role: 'user',
	};

	// add home object we created to the array of homes
	homes.push(home);
	// return the data we just created
	res.send(home);
});

// put is using to edit
// first we need to find the id we want to edit
// then we need pass the new req.body.homeType
app.put('/api/listing/:id', (req, res) => {
	// logic to check if the id exists in the array with homes.find()
	// we make use of parseInt to convert req.params.id to interger
	const home = homes.find((home) => home.id === parseInt(req.params.id)); // req.params.id we can return the id that we pass to the route

	// check if home is false
	if (!home) {
		// send a status 404 with text ...
		return res.status(404).send('The home with given id cannot be found.');
	}

	// overwrite properties
	home.homeType = req.body.homeType;
	home.description = req.body.description;

	// send back edited object
	res.send(home);
});

// we can have access to the env variable
// if theres not port in the .env it will be passed 3000
const port = process.env.PORT || 3000;

// make request on port from env var
app.listen(port, () => console.log(`Server is running on port ${port}.`));
