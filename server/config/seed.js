/*
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Item = require('../api/item/item.model');
var User = require('../api/user/user.model');

var names = [ 'I9100 Black','I9100 White','I9100 贴纸','I9300 Black','I9300 White','I9300 Pink','I9300 Blue','I9300 Grey','I9300 Purple','I9300Gold','I9300 Brown','I9300 Red','I9300 贴纸','I9500 Black','I9500 White','I9500 Blue','I9500 Pink','I9500 Red','I9500 Purple','I9500 Grey','I9500 贴纸','N7000 Black','N7000 White','N7000 Red','N7000 贴纸','N7100 Brown','N7100 White','N7100 Grey','N7100 Blue','N7100 Pink','N7100 Black','N7100 贴纸','N9000 White','N9000 Black','N9000 Red','N9000 Pink','N9000 Grey','N9000 贴纸','IP5 Black','IP5 White','IP5 LGreen','IP5 Dgreen','IP5 Purple','IP5 GD/OR(yellow gold)','IP5 DGD','IP5 Pink','IP5 Sliver','IP5 贴纸','IP4 BK','IP4 w','IP4 RED','IP4 silver','IP4 BK touch','IP4 w touch','IP4 pu','IP4 pink','IP4 BL','IP4 OR/GD','IP4 DGD','IP4 贴纸','IP64.7 BK','IP64.7 WT','IP65.5 BK','IP65.5 WT','IP64.7 贴纸','IP65.5 贴纸','IP工具','I8190 Black','I8190 RED','I8190 White','I8190 Blue','I8190 贴纸','I9190 Blue','I9190 White','I9190 Black','I9190 贴纸','I9200 Black','I9200 White','I9200 Grey','I9200 Blue','大盒子','I9200 贴纸','G900 BK','G900 Gold','G900 Grey','G900 Pebble Bule 宝蓝','G900 PU','G900 Bright blue 北极蓝','G900 Red','G900 Pink','G900 W','G900 贴纸','RCG900GD','RCG900W','RCG900BL','RCG900BK','NEXUS 5','I9080 BL','I9080 W','I9080 BK','N9100 BK','N9100 WT','N9100 贴纸','NOKIA920','NOKIA920 贴纸','LG920绿色工具','G800 BK','G800 W','502BW','HZ-402P SDI','HZ-401P/SDI','HZ-100P/SDI','HZ-MU21','FL1T6-E17','FL1T6-E17RD','FL1T6-E17GN','FL1T6-C4','FL3T6','FL4T6-SKY3800-BK','FL15T6','FL12T6','FL18T6','FL9T6','BL2T6-X2-BK','BL2T6-X2-R','BL5T6','NTC50','NTC50HD','WB01','NTS200 1M','NTS200 3M','NTS200 5M','WF200 1M','rentiganying-10p','RJ3000','HZ-WP15','SOR103','SOR68','SOR69','SOR100-3','SOR200-3-WARM','SOR200-3-COOL','SOR200-3-RGB','SOR500-3-WARM','SOR50-3-PEACH RGB','SOR50-3-PEACH-PU','SOR50-3-PEACH-BL','SOR30-DRAGPNFLY RGB','SOR30-DRAGPNFLY W','SOR100-8-WARM COLD','SOR100-8-RGB','SOR01','SOR02','说明书','三星工具','小盒子','8TO30PIN-BK','8TO30PIN-W','MICT08','IP6-4.7-8T030-BK','IP6-4.7-8T030-W','IP6-5.5-8T030-BK','IP6-5.5-8T030-W','A1-4.7BK','A1-4.7WT','A1-4.7PK','A1-4.7PU','A1-4.7RD','A1-4.7BW','B1-4.7BL','B1-4.7RD','B1-4.7WT','B1-4.7BK','B1-5.5BL','B1-5.5RD','B1-5.5WT','B1-5.5BK','C1-4.7BK','C1-4.7WT','C1-5.5WT','TEMPERED GALSS FILM','TEMPERED GALSS FILM','GALAXY NOTE4 GLASS FIRM' ];
var weights = [ '','','c','','','','','','','','','','c','','','','','','','','c','','','','c','','','','','','','c','','','','','','c','','','','','','','','','','c','','','','','','','','','','','','c','','','','','c','c','c','','','','','c','','','','c','','','','','c','c','','','','','','','','','','c','3oz','3oz','3oz','3oz','','','','','','','','','','c','','','5.2oz','1lb13oz','15oz','10oz','7.5oz','6.3oz','6.6oz','7.1oz','6.9oz','1lb2oz','15oz','2lb2oz','1lb15oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','c','c','c','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz','oz' ];
var lowQuantities = [ 15,15,30,30,40,10,40,20,20,20,20,10,100,40,30,20,10,10,15,15,100,20,20,20,50,20,20,20,20,10,20,60,20,20,20,20,20,50,30,30,2,2,2,30,50,2,2,100,25,25,2,20,15,15,10,10,15,20,30,100,30,30,30,30,50,50,200,25,10,25,25,50,25,25,25,50,40,25,20,20,300,100,90,30,30,30,30,30,30,30,30,100,10,10,10,10,2,3,3,3,40,40,50,3,3,20,5,5,2,3,3,5,3,5,3,3,3,4,4,5,5,2,5,5,2,5,7,8,3,2,2,2,2,5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,2,500,600,600,30,30,30,10,10,10,10,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ];
var boxes = [ 's','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','l','l','l','l','l','','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','l','l','','','','s','s','s','s','s','s','s','s','','l','l','l','l','','','s','s','s','s','s','s','s','s','s','s','','','','','s','s','s','s','l','l','','s','s','','s','s','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','' ];
var prices = [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0.3,0.3,0.3,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5 ];
var notes = [ '','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','S5','S5','S5','S5','S5','S5','S5','S5','S5','S5','','','','','','','','','note 4','note 4','note 4','用绿色工具','','','S5 MINI','S5 MINI','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','' ];
var quantities = [ 58,30,285,31,58,29,64,58,32,99,74,17,204,159,34,28,49,45,39,19,128,42,41,13,183,13,64,142,24,23,22,175,15,107,47,50,48,302,52,21,5,5,5,20,111,3,62,548,34,42,5,38,21,15,59,61,60,111,49,401,100,136,125,126,163,111,238,26,21,21,8,100,55,125,101,114,95,90,62,34,135,274,43,107,50,56,58,23,49,16,176,78,30,2,1,8,10,35,40,25,162,179,321,43,43,43,28,27,0,5,3,12,5,20,0,3,20,3,8,5,5,1,7,6,0,15,12,0,0,2,4,5,6,4,6,10,5,0,5,4,2,2,2,2,2,2,2,2,1,5,5,40,20,-29,713,-76,31,16,105,44,45,49,50,1,2,2,1,1,2,2,2,4,2,2,2,4,2,5,5,5,22,29,10 ];

var items = [];
var basicItemMap = {};

Item.find({}).remove( function() {

	var findChildItemByName = function( basicItemMap, name ) {

		var item = basicItemMap[name];

		if( item ) {

			var obj = {
				id : item._id,
				name : item.name,
				price : item.price
			}

			return obj;

		}

		return null;

	};

	var itemsToCreate = [];

	for( var i = 0; i < names.length; i++ ) {

		var name = names[i];
		var weight = weights[i];
		var lowQuantity = lowQuantities[i];
		var price = prices[i];
		var note = notes[i];
		var quantity = quantities[i];

		var item = {
			name : name,
			weight : weight,
			lowQuantity : lowQuantity,
			price : price,
			note : note,
			quantity : quantity,
			lastUpdateDate : new Date(),
			createDate : new Date()
		};

		items[i] = item;

		if( weight ) {
			itemsToCreate.push( item );
		}

	}

	console.log( itemsToCreate.length );

	Item.create( itemsToCreate, function( err ) {
		
		for( var i = 1; i < arguments.length; ++i ) {

	        var addedItem = arguments[i];
	        basicItemMap[addedItem.name] = addedItem;

    	}

    	console.log( arguments.length );

    	var basicItemsToCreate = [];

		for( var i = 0; i < items.length; i++ ) {
			
			var item = items[i];
			var box = boxes[i];

			if( !item.weight ) {

				item.childItems = [];

				// 说明书
				item.childItems.push( { item : findChildItemByName( basicItemMap, '说明书'), quantity : 1 } );

				// box 
				if( box === 's' ) {
					item.childItems.push( { item : findChildItemByName( basicItemMap, '小盒子'), quantity : 1 } );
				}
				else if( box === 'l' ) {
					item.childItems.push( { item : findChildItemByName( basicItemMap, '大盒子'), quantity : 1 } );
				}

				// 工具

				if( item.name.indexOf( 'IP' ) == 0 ) {
					item.childItems.push( { item : findChildItemByName( basicItemMap, 'IP工具'), quantity : 1 } );
				}
				else {
					item.childItems.push( { item : findChildItemByName( basicItemMap, '三星工具'), quantity : 1 } );
				}

				// 贴纸

				var start = item.name.split( ' ' )[0];
				var adhesive = findChildItemByName( basicItemMap, start + ' 贴纸' );

				if( adhesive ) {
					item.childItems.push( { item :adhesive, quantity : 1 } );
				}

				basicItemsToCreate.push( item );

			}

		};

		Item.create( basicItemsToCreate );

		console.log( 'added all items' );

	});

});

/*User.find({}).remove(function() {

	User.create({
		provider: 'local',
		name: 'Test User',
		username: 'test',
		password: 'test'
	}, {
		provider: 'local',
		role: 'admin',
		name: 'Admin',
		username: 'admin',
		password: '4dm1n'
	}, function() {
			console.log('finished populating users');
		}
	);
	
});*/