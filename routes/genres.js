let express=require("express");
let router=express.Router();
let {allGenres}=require('../crud/getGCR');


router.get("/",(req,res)=>{
    res.render("generos")
});

router.post("/",(req,res)=>{
    res.send({state:true,genres:allGenres()});
});

module.exports = router