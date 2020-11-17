// require the express package
const express = require('express');

// init express package
const app = express();

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

// make request on port 3000
app.listen(3000, () => console.log('Server is running on port 3000.'));
