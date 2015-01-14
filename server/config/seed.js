/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Item = require('../api/item/item.model');
var User = require('../api/user/user.model');

Item.find({}).remove(function() {

  var names = [ 'I9100 Black','I9100 White','I9100 Adhesive','I9300 Black','I9300 White','I9300 Pink','I9300 Blue','I9300 Grey','I9300 Purple','9300Gold','I9300 Brown','I9300 Red','I9300 Adhesive','I9500 Black','I9500 White','I9500 Blue','I9500 Pink','I9500 Red','I9500 Purple','9500 Grey','I9500 Adhesive','N7000 Black','N7000 White','N7000 Red','N7000 Adhesive','N7100 Brown','N7100 White','N7100 Grey','N7100 Blue','N7100 Pink','N7100 Black','N7100 Adhesive','N9000 White','N9000 Black','N9000 Red','N9000 Pink','N9000 Grey','N9000 Adhesive','I5 Black','I5 White','i5 LGreen','i5 Dgreen','i5 Purple','i5 GD/OR(yellow gold)','i5 DGD','i5 Pink','i5 Sliver','I5 Adhesive','i4 BK','i4 w','i4RED','i4 silver','i4 BK touch','i4 w touch','i4 pu','i4 pink','i4 BL','i4 OR','i4 Gold','i4 Adhensive','LGIP6BK','LGIP6WT','LGIP6BK-PLUS','LGIP6WT-PLUS','IP4.7贴纸','IP5.5贴纸','IP贴纸','I8190 Black','8190 RED','I8190 White','8190 Blue','I8190 Adh','9190 Blue','9190 White','9190 Black','9190 Adh','9200 Black','9200 White','9200 Grey','9200 Blue','9200 box','9200 Adh','900BK','900Gold','900Grey','900 Pebble Bule 宝蓝','900 PU','900 Bright blue 北极蓝','900 Red','900 Pink','900W','900adh','RCG900GD','RCG900W','RCG900BL','RCG900BK','NEXUS 5','9080 BL','9080 W','9080BK','note4-LGN9100BK','note4-LGN9100WT','note4贴纸','LG920玻璃','LG920胶贴','LG920绿色工具','G800BK','G800W','502BW','HZ-402P SDI','HZ-401P/SDI','CH-I4','HZ-100P/SDI','HZ-MU21','FL1T6-E17','FL1T6-E17RD','FL1T6-E17GN','FL1T6-C4','FL3T6','FL4T6-SKY3800-BK','FL15T6','FL12T6','FL18T6','FL9T6','BL2T6-X2-BK','BL2T6-X2-R','BL5T6','NTC50','NTC50HD','WB01','NTS200 1M','NTS200 3M','NTS200 5M','WF200 1M','rentiganying-10p','RJ3000','HZ-WP15','SOR103','SOR68','SOR69','SOR100-3','SOR200-3-WARM','SOR200-3-COOL','SOR200-3-RGB','SOR500-3-WARM','SOR50-3-PEACH RGB','SOR50-3-PEACH-PU','SOR50-3-PEACH-BL','SOR30-DRAGPNFLY RGB','SOR30-DRAGPNFLY W','SOR100-8-WARM COLD','SOR100-8-RGB','SOR01','SOR02','说明书','三星工具','小盒子','8TO30PIN-BK','8TO30PIN-W','MICT08','IP6-4.7-8T030-BK','IP6-4.7-8T030-W','IP6-5.5-8T030-BK','IP6-5.5-8T030-W','A1-4.7BK','A1-4.7WT','A1-4.7PK','A1-4.7PU','A1-4.7RD','A1-4.7BW','B1-4.7BL','B1-4.7RD','B1-4.7WT','B1-4.7BK','B1-5.5BL','B1-5.5RD','B1-5.5WT','B1-5.5BK','C1-4.7BK','C1-4.7WT','C1-5.5WT','TEMPERED GALSS FILM','TEMPERED GALSS FILM','GALAXY NOTE4' ];
  var quantities = [ 58,32,287,31,73,29,75,59,36,100,76,17,238,164,34,30,50,46,39,19,137,42,41,13,183,13,64,143,24,23,23,177,15,109,48,50,48,305,52,21,5,5,5,20,115,3,62,552,34,42,5,38,22,15,59,61,60,111,52,405,101,136,128,128,164,116,252,26,21,21,11,103,55,125,103,116,101,90,62,34,141,280,59,108,50,56,58,24,49,16,178,98,34,5,2,12,10,35,40,25,165,180,325,43,43,43,28,27,0,5,3,0,13,5,20,0,3,20,3,9,5,5,1,7,7,0,15,12,1,0,2,4,5,6,6,6,11,5,0,5,4,2,2,2,2,2,2,2,2,1,5,5,40,20,70,798,29,31,23,105,44,45,49,50,1,2,2,1,1,2,2,2,4,2,2,2,4,2,5,5,5,22,29,10 ];

  if( names.length === quantities.length ) {

    for( var i = 0; i < names.length; i++ ) {

      Item.create({
        name : names[i],
        quantity : quantities[i],
        price : 1
      })

    }

  }
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: '4dm1n'
  }, function() {
      console.log('finished populating users');
    }
  );
});