let {Router}=require('express');
let router=Router();
let {searchAlbum}=require('../crud/crudAlbums');
let {searchArtist}=require('../crud/crudArtists');


router.get('/',(req,res)=>{
    let obj={
        title:(req.query.search==undefined)?"":req.query.search,
        genre:(req.query.genre==undefined)?undefined:req.query.genre
    }
    getDateSearch(obj).then(ress=>{
        console.log(ress,"esto voy a enviar");
        res.render('result',ress);
    }).catch(errr=>{
        res.send(errr.message);
    });
});

const getDateSearch=async(object)=>{
    let albums=await searchAlbum(object);
    let artist=await searchArtist(object);
    return {state:true,albums:albums,artists:artist,alen:artist.length,allen:albums.length}
}

module.exports = router;