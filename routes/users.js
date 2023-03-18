var express = require('express');
var router = express.Router();

/* GET login user listing. */
router.get('/login', function(req, res, next) {
  res.render('auth/login',{title:"Login User"});
});


/* GET show register user page. */
router.get('/create', function(req, res, next) {
  res.render('auth/register',{title:"Register User"});
});

/* POST register user listing. */
router.post('/', function(req, res, next) {
  let response = req.body;
  res.json(response);
  return;
  const notification = {status:true,message:'example message in here for you'}
  res.render('auth/register',{title:"Register User",notification:notification});
});


/* GET shwo list of users listing. */
router.get('/', function(req, res, next) {
  res.send('show list of users');
});

module.exports = router;
