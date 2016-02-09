var globals=require('./../routes/globals');
var dbase=require('./../routes/mongo');
var assert=require('assert');
 
//Returns all COLLECTION NAMES IN CURRENT Database
exports.getCollectionNames=function(callback){ 
    dbase.db.listCollections().toArray(function(err, result) {
      if(err && callback) return callback(err, null); 
      var names = [];
      for (var r in result) {
        names.push(result[r].name);
      }
      if (callback) {
        callback(null,names);
      }
    });
};



//Sample Method:
exports.findRestaurants = function(db, callback) {
   var cursor =db.collection('restaurants').find( );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};
