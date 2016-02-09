var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var globals=require('./globals').globals;
var _globals=globals;
var db;
MongoClient.connect(_globals.dburl, function(err, dbase) {
  assert.equal(null, err);
  db=dbase;
  console.log("Connected correctly to server.");
  //db.close();
  exports.db=db;
});

