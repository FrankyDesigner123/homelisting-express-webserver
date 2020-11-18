// import express package
const express = require('express');

// import House model
const House = require('../models/House');

// init the router
const router = express.Router();

// create House Listing Data
router.post('/', (req, res) => {
	// we create an instance of the Class House
	const house = new House({
		title: req.body.title,
		address: req.body.address,
		homeType: req.body.homeType,
		description: req.body.description,
		price: req.body.price,
		image: req.body.image,
		yearBuilt: req.body.yearBuilt,
	});

	// save the object we created
	house
		.save()
		.then((result) => {
			res.send({
				message: 'House data created successfuly.',
				data: result,
			});
		})
		.catch((err) => console.log(err));
});

// we need to export it so we can make us of it in index.js
module.exports = router;
