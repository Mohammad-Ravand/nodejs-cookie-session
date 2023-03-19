var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const userRegister = req.signedCookies?.userRegister?.length ? JSON.parse(req.signedCookies.userRegister) : {};
  const login = {
    code: Boolean(req.session.login),
    text: Boolean(req.session.login)==true ? 'logged in' : 'not logged in'
  };

  if(login.code==false){
    //redirect user to login page
    res.redirect('/users/login');
    return;
  }

  res.render('index', { title: 'Express',userRegister:{...userRegister} ,login: login});
});

module.exports = router;
