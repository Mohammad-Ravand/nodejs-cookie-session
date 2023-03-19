var express = require('express');
const { registerUserValidation, loginUserValidation } = require('./../validation/userValidation');
var router = express.Router();

/* GET show login page. */
router.get('/login', function(req, res, next) {
  
  const userRegister = req.signedCookies?.userRegister?.length ? JSON.parse(req.signedCookies.userRegister) : {};

  res.render('auth/login',{title:"Login User",register_email:userRegister.email,register_password:userRegister.password});
});


/* POST post login page. */
router.post('/login', function(req, res, next) {
  //get previous registered user infos  
  const userRegister = req.signedCookies?.userRegister?.length ? JSON.parse(req.signedCookies.userRegister) : {};

  //validate login user
  const validation  =loginUserValidation(req.body); 
  const notification = validation;

  if(validation.status==false){
    res.render('auth/login',{title:"Login User",notification:notification,register_email:userRegister.emial,register_password:userRegister.password});
    return;
  } 

  //verify user registration
  if(userRegister.email==req.body.email && userRegister.password==req.body.password){
    //save register user and login  status
    req.session.registerUser = userRegister;
    req.session.login = true;

    //redirect user to home page
    res.redirect('/');
  }else{
    notification.status=false;
    notification.message="username does not refer to registered user"
    res.render('auth/login',{title:"Login User",notification:notification,register_email:userRegister.emial,register_password:userRegister.password});
    return;
  }

});


/* GET show register user page. */
router.get('/create', function(req, res, next) {
  const userRegister = req.signedCookies?.userRegister?.length ? JSON.parse(req.signedCookies.userRegister) : {};

  res.render('auth/register',{title:"Register User",userRegister:{...userRegister}});
});



/* GET show register user page. */
router.get('/logout', function(req, res, next) {
  const login = Boolean(req.session.login)
  if(login){
    req.session.login = false;
    req.session.userRegister = {};
  }

  res.redirect('/users/login');
});


/* POST register user listing. */
router.post('/', function(req, res, next) {

  //validation user infos
  const validation = registerUserValidation(req.body)
  const notification = validation;
  if(validation.status==false){
    res.render('auth/register',{title:"Register User",notification:notification});
    return;
  }
  
  // save user info in cookies
  res.cookie("userRegister",JSON.stringify(req.body),{ signed: true })
  
  //redirect user to login page
  res.redirect('/users/login');

});


/* GET shwo list of users listing. */
router.get('/', function(req, res, next) {
  res.send('show list of users');
});

module.exports = router;
