var express = require('express');
var crud=require('./../models/crud')
//local vars
var router = express.Router();
var _crud=crud;
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
 
 
/* GET CollectionNamesList page. */
router.post('/home', function(req, res, next) {
 _crud.getCollectionNames(function(err,names){
    res.send(JSON.stringify(names));   
 })
});

/* GET CollectionContent page. */
router.get('/page1', function(req, res, next) {
    res.render('index', { title: 'Express' });
   // res.send({"Page1":"page1"});   
  
});


/* GET home page. */
router.post('/page2', function(req, res, next) {
 _crud.getCollectionNames(function(err,names){
    res.send({"Page2":"page2"});   
 })
});


/* GET home page. */
router.post('/page3', function(req, res, next) {
 _crud.getCollectionNames(function(err,names){
    res.send({"Page3":"page3"});   
 })
});


module.exports = router;
