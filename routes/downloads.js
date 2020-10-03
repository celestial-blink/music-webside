let express=require('express')
let router=express.Router();
let {searchOne}=require('../crud/crudAlbums');

router.get('/',(req,res)=>{
    getLinksDownloads(req.query).then(ress=>{
        console.log(ress,"esto voy a enviar");
        res.render('downloads',ress)
    }).catch(errr=>{
        res.send(errr);
    });
});

const getLinksDownloads=async(object)=>{
    let links=await searchOne(object);
    return {state:true,links:links,title:object.album};
}

module.exports = router;