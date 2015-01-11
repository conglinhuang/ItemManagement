'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TransactionSchema = new Schema({
	item: {
		_id : String,
		name: String,
		price: Number
	},
	quantity: Number,
	createDate: Date,
	lastUpdateDate: Date
});

module.exports = mongoose.model('Transaction', TransactionSchema);