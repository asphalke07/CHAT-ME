const express=require('express');
const router=express.Router();

router.get('/',function(req,res){
    res.send("akshay ur port is up");
});

module.exports=router;