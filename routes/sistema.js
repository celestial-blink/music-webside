let express=require("express");
let router=express.Router();
let usnam=require('../Globals/variables');
let {allArtist}=require('../crud/crudArtists');
let {allAlbums}=require('../crud/crudAlbums');
let {allNews}=require('../crud/crudNews');
let {searchUserFornName}=require('../crud/crudUsers');

router.get("/",(req,res)=>{

    if (req.query.close){
        console.log(req.query.close);
        usnam.setuser("");
    }

    if(usnam.getuser()==undefined || usnam.getuser()==""){
        res.redirect('/login')
    }else{
        console.log(req.query,"esto me llegó");
        if (req.query.view==undefined || req.query.view=={}){
            selectTitle({view:"artistas"}).then(ress=>{
                console.log("esto voy a enviar");
                res.render('sistema',ress)
            }).catch(errr=>{
                console.log(errr,"eror");
                res.send(errr);
            })
        }else{
            selectTitle(req.query).then(ress=>{
                console.log(ress,"esto voy a enviar desde queris");
                res.render('sistema',ress);
                
            }).catch(errr=>{
                console.log(errr,"esto es el error");
                res.send(errr)
            })
        }
    }

    // if(usnam.getuser()==undefined || usnam.getuser()==""){
    //     res.redirect("/login");
    // }else{
    //     res.render('sistema')
    // }
});

const selectTitle=async(object)=>{
    let usN=await searchUserFornName({name:usnam.getuser()});
    switch(object.view){
        case "artistas":
            let ar=await allArtist(object);
            return {
                    profile:"",
                    user:{
                        name:usN.name,
                        fullname:usN.fullName,
                        email:usN.email
                    },
                    form:"artist",
                    title:"Artistas",
                    result:{
                        range:ar.range,
                        total:ar.total,
                        cards:ar.artists,
                        pages:ar.pages
                    },
                };
        case "albumes":
            let al=await allAlbums(object);
            return {
                    profile:"",
                    user:{
                        name:usN.name,
                        fullname:usN.fullName,
                        email:usN.email
                    },
                    form:"album",
                    title:"Albumes",
                    result:{
                        range:al.range,
                        total:al.total,
                        cards:al.albums,
                        pages:al.pages
                    },
                };

        case "noticias":
            let ne=await allNews(object);
            return {
                    profile:"",
                    user:{
                        name:usN.name,
                        fullname:usN.fullName,
                        email:usN.email
                    },
                    form:"news",
                    title:"Noticias",
                    result:{
                        range:ne.range,
                        total:ne.total,
                        cards:ne.news,
                        pages:ne.pages
                    },
                };
        
        case "perfil":

            return {
                profile:true,
                user:{
                    name:usN.name,
                    fullname:usN.fullName,
                    email:usN.email
                },
                form:"profile",
                title:"Perfil"
            };


        default:
        return {state:false,message:"no se encontro vista"};
    }
}


module.exports = router;