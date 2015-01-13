'use strict';

var mongoosePaginate = require( 'mongoose-paginate' );
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TransactionSchema = new Schema({
	item: {
		_id : String,
		name: String,
		price: Number
	},
	quantity: Number,
	type: String,
	createDate: Date,
	lastUpdateDate: Date
});

TransactionSchema.plugin( mongoosePaginate );
module.exports = mongoose.model('Transaction', TransactionSchema);