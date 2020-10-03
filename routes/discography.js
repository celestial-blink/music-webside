let express = require("express")
let router=express.Router();
let {SearchForArtist}=require('../crud/crudAlbums');

router.get("/",(req,res)=>{
    
    getDataDiscography(req.query).then(ress=>{
        console.log(ress,"esto voy a enviar");
        res.render("discography",ress);
    }).catch(errr=>{
        res.send(errr);
    })

});

const getDataDiscography=async(object)=>{
    let discography=await SearchForArtist(object);
    return {state:true,discography:discography,title:object.title}
}

module.exports = router;