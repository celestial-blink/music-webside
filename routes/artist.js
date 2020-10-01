let express=require("express");
let router=express.Router();
let {allArtistOrderByName}=require('../crud/crudArtists');


router.get("/",(req,res,next)=>{
    res.render("artistas")
});

router.post("",(req,res)=>{
    getDataArtist().then(ress=>{
        console.log(ress,"esto voy a enviar");
        res.send(ress);
    }).catch(errr=>{
        res.send({state:false,count:0,artist:[],message:errr.message});
    })
})

const getDataArtist=async()=>{
    let artist=await allArtistOrderByName();
    return {state:true,count:artist.length,artist:artist};
}

module.exports = router;