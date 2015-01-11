'use strict';

var _ = require('lodash');

var Transaction = require('./transaction.model');
var Item = require('../item/item.model');

// Get list of transactions
exports.index = function(req, res) {

	var params = req.query;

	var filter = {};

	if( params.searchText ) {
		filter['item.name'] = { $regex : params.searchText, $options : 'i' };
	}
	
	if( params.startDate && params.endDate ) {
		filter['createDate'] = { '$gte' : new Date( params.startDate ), '$lt' : new Date( params.endDate ) };
	}

	var sort = {};
	sort[params.sort] = params.sortOrder;

	var page = params.page;
	var pageSize = params.pageSize;

	Transaction.paginate(filter, page, pageSize, function( err, pageCount, paginatedResults, itemCount ) {

		if(err) { return handleError(res, err); }
		return res.json(200, {

			totalPages : pageCount,
			content : paginatedResults,
			totalElements : itemCount

		});

	}, { sortBy : sort });

};

// Get a single transaction
exports.show = function(req, res) {
	Transaction.findById(req.params.id, function (err, transaction) {
		if(err) { return handleError(res, err); }
		if(!transaction) { return res.send(404); }
		return res.json(transaction);
	});
};

// Creates a new transaction in the DB.
exports.create = function(req, res) {

	var transaction = req.body;

	transaction.lastUpdateDate = new Date();
	transaction.createDate = transaction.lastUpdateDate; 

	processItem( transaction.item, transaction.quantity, 0, res, function() {
	
		Transaction.create( req.body, function(err, transaction) {
			if(err) { return handleError(res, err); }
			return res.json(201, transaction);
		});

	});

};

// Updates an existing transaction in the DB.
exports.update = function(req, res) {

	if(req.body._id) { delete req.body._id; }

	Transaction.findById(req.params.id, function (err, transaction) {

		if (err) { return handleError(res, err); }
		if(!transaction) { return res.send(404); }

		processItem( req.body.item, req.body.quantity, transaction.quantity, res, function() {

			var updated = _.merge(transaction, req.body);
			updated.lastUpdateDate = new Date();
			updated.save(function (err) {
				if (err) { return handleError(res, err); }
				return res.json(200, transaction);
			});

		});

	});
};

// Deletes a transaction from the DB.
exports.destroy = function(req, res) {

	Transaction.findById(req.params.id, function (err, transaction) {
		
		if(err) { return handleError(res, err); }
		if(!transaction) { return res.send(404); }

		processItem( transaction.item, 0, transaction.quantity, res, function() {

			transaction.remove(function(err) {
				if(err) { return handleError(res, err); }
				return res.send(204);
			});

		});

	});
};

function handleError(res, err) {
	return res.send(500, err);
}

function processItem( item, newQuantity, oldQuantity, res, callback ) {
	
	Item.findById( item._id, function( err, item ) {

		if( err ) { return handleError( res, err ); }
		if( !item ) { return res.send(404); }

		// build an array of child item ids
		var childItemIds = [];
		for( var i = 0; i < item.childItems.length; i++ ) {
			childItemIds.push( item.childItems[i].item._id );
		}

		Item.find({
			'_id' : { $in : childItemIds }
		}, function( err, childItems ) {

			for( var i = 0; i < childItems.length; i++ ) {
				
				var childItem = childItems[i];
				var childNewQuantity = newQuantity * item.childItems[i].quantity;
				var childOldQuantity = oldQuantity * item.childItems[i].quantity;

				if( childItem.quantity + childOldQuantity < childNewQuantity ) {
					return handleError( res, childItem.name + '数量不足' );
				}
				else {
					childItem.quantity = childItem.quantity + childOldQuantity - childNewQuantity;
				}

			}

			if( item.quantity + oldQuantity < newQuantity ) {
				return handleError( res, item.name + '数量不足' );
			}
			else {
				item.quantity = item.quantity + oldQuantity - newQuantity;
			}

			for( var i = 0; i < childItems.length; i++ ) {

				childItems[i].save( function(err) {
					if (err) { return handleError(res, err); }
				});

			}

			item.save( function(err) {
				
				if (err) { return handleError(res, err); }

				if( callback ) {
					callback();
				}

			});

		});

	})
		
}