var express = require('express');
var router = express.Router();
const User = require("../models/user")

/* GET users listing. */
router.get('/', async function(req, res, next) {
    try{
      const users = await User.find();
      
      res.send({
        status:true,
        data:users
      })

    }catch(err){
      
      next(new Error(err))
    }
});

router.post("/",async(req,res,next)=>{
    try{
      const user = await User.create(req.body);
      res.send({
        status:true,
        data:user
      })
    }catch(err){
      next(new Error(err))
    }
});

router.delete("/:id",async(req,res,next)=>{
  try{
    const user = await User.findByIdAndDelete(req.params.id);
    res.send({
      status:true,
      data:req.params
    })
  }catch(err){
    next(new Error(err))
  }
});

module.exports = router;
