var express = require('express');
var router = express.Router();
const Land = require("../models/lands")

/* GET users listing. */
router.get('/', async function(req, res, next) {
    try{
      const land = await Land.find();
      
      res.send({
        status:true,
        data:land
      })

    }catch(err){
      
      next(new Error(err))
    }
});

router.post("/",async(req,res,next)=>{
    try{
      const land = await Land.create(req.body);
      res.send({
        status:true,
        data:land
      })
    }catch(err){
      next(new Error(err))
    }
});

router.delete("/:id",async(req,res,next)=>{
  try{
    const land = await Land.findByIdAndDelete(req.params.id);
    res.send({
      status:true,
      data:land
    })
  }catch(err){
    next(new Error(err))
  }
});

module.exports = router;
