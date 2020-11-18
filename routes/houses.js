// import express package
const express = require('express');

// import some function from express-validator
const { check, validationResult } = require('express-validator');

// import House model
const House = require('../models/House');

// init the router
const router = express.Router();

// validation
const validate = [
	check('title')
		.isLength({ min: 3, max: 50 })
		.withMessage('Title should be between 3 to 50 characters.'),
	check('description')
		.isLength({ min: 10, max: 200 })
		.withMessage('Description should be between 10 to 200 characters.'),
	check('address')
		.isLength({ min: 10, max: 100 })
		.withMessage('Address should be between 10 to 100 characters.'),
	check('price').isNumeric().withMessage('Price should be a number.'),
];

// create House Listing Data using .post()
// pass in validation as second parameter
router.post('/', validate, (req, res) => {
	// check the validation
	const errors = validationResult(req);

	// check errors
	if (!errors.isEmpty()) {
		return res.status(422).send({ errors: errors.array() });
	}
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

// fetch House Listing Data using .get()
router.get('/', (req, res) => {
	// .find() is mongoose method, this returns all the data in the collection House
	House.find()
		// get result that we can send back to user
		.then((houses) => {
			res.send(houses);
		})
		.catch((err) => console.log(err));
});

// fetch House Listing Data by ID
router.get('/:id', (req, res) => {
	// grab the id from the params
	const houseId = req.params.id;

	//
	House.findById(houseId)
		// if we succeed to fetch the item by id, then we send it back to the user
		.then((house) => {
			res.send(house);
		})
		.catch((err) => console.log(err));
});

//update House Listing data using .put()
router.put('/:id', validate, (req, res) => {
	// grab the id from the params
	const houseId = req.params.id;

	// check the validation
	const errors = validationResult(req);

	// check errors
	if (!errors.isEmpty()) {
		return res.status(422).send({ errors: errors.array() });
	}

	// find the item we want to update
	House.findById(houseId)
		.then((house) => {
			(house.title = req.body.title),
				(house.address = req.body.address),
				(house.homeType = req.body.homeType),
				(house.description = req.body.description),
				(house.price = req.body.price),
				(house.image = req.body.image),
				(house.yearBuilt = req.body.yearBuilt);

			// this wont create a new collection, but will update the existing one.
			// its because in this instance the id remains the same
			return house.save();
		})
		// we get the result and pass back to the user
		.then((result) => {
			res.send(result);
		})
		.catch((err) => console.log(err));
});

// we need to export it so we can make us of it in index.js
module.exports = router;
