var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {

  /**
   * validate show list of users
   */
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

  /**
   * end validate show list of users
   */


  const sessionnIds = await req.client.keys('sess:*');

  let users =await req.client.MGET(sessionnIds);
 
 
  if(users.length > 0){
    users.forEach(function(user,index){
      user = JSON.parse(user);
      user = user.registerUser
      if(user.email ==userRegister.email){
        user.self = true;
      }else{
        user.self = false;
      }
      users[index] = user
    });
  }

  res.render('index', { title: 'Express',usersRegister:{...users} ,login: login});
});


/* GET home page. */
router.get('/session', async function(req, res, next) {
  
  //get all list of users
  const session_id = req.sessionID;
  
  const value = await req.client.keys('sess:*');
  console.log(value)
  res.json(value)
  
  return;
  res.render('index', { title: 'Express',userRegister:{...userRegister} ,login: login});
});

module.exports = router;
