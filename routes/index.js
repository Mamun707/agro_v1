var express = require('express');
var router = express.Router();
const User = require("../models/user")

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.subdomains)
  res.render('index', { title: 'Express' });
});

router.post('/login', async function(req, res, next) {
  const {email,password}=req.body;
  const userExist = await User.findOne({email,password});
  console.log(userExist)

  if(userExist){
    res.send({
      status:true,
      role:userExist.role
    })
  }else{
    next(new Error())
  }

});

module.exports = router;
