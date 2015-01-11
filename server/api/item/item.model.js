'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var childItemSchema = new Schema({
	item : {
		_id : String,
		name: String,
		price: Number
	},
	quantity : Number
});

var ItemSchema = new Schema({
	name: String,
	quantity: Number,
	price: Number,
	createDate: Date,
	lastUpdateDate: Date,
	childItems: [childItemSchema]
});

module.exports = mongoose.model('Item', ItemSchema);