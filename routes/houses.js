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

// create House Listing Data
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

// we need to export it so we can make us of it in index.js
module.exports = router;
