'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var childItemSchema = new Schema({
	item : {
		id : String,
		name: String,
		price: Number
	},
	quantity : Number
});

var ItemSchema = new Schema({
	name: String,
	quantity: Number,
	price: Number,
	lowQuantity : Number,
	weight : String,
	note : String,
	createDate: Date,
	lastUpdateDate: Date,
	childItems: [childItemSchema]
});

module.exports = mongoose.model('Item', ItemSchema);