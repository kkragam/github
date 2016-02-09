var express = require('express');
var crud=require('./../models/crud')
//local vars
var router = express.Router();
var _crud=crud;
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
 
 
 /* GET home page. */
router.get('/dbnames', function(req, res, next) {
 _crud.getCollectionNames(function(err,names){
    res.send(JSON.stringify(names));   
 }) 
  
});

module.exports = router;
