// import mongoose
const mongoose = require('mongoose');

// create constance where we create new instance of mongoose.Schema
// in the Schema we define the shape of the data
const HouseSchema = new mongoose.Schema({
	title: { type: String, required: true },
	address: { type: String, required: true },
	homeType: String,
	description: String,
	price: { type: Number, required: true },
	image: String,
	yearBuilt: Number,
});
